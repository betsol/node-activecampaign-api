
const _ = require('lodash');
const requireDirectory = require('require-directory');

const Errors = requireDirectory(module, './Errors');



class ApiHelper {

  /**
   * @param {object} client
   */
  constructor (client) {
    this.client = client;
  }


  //==================//
  // OFFICIAL METHODS //
  //==================//

  /**
   * @param {object} body
   * @param {object} [options]
   */
  contactSync (body, options) {
    body = body || {};
    options = _.extend({
      customFields: {}
    }, options || {});
    _.forEach(options.customFields, (value, key) => {
      if (value) {
        addCustomField(body, key, value);
      }
    });
    _.forEach(options.listIds, listId => {
      if (listId) {
        body['p[' + listId + ']'] = listId;
      }
    });
    return this.client.call('contact_sync', {}, 'POST', body);
  }

  contactList (query) {
    query = query || {};
    return this.client.call('contact_list', query);
  }


  //================//
  // HELPER METHODS //
  //================//

  contactListFirst (query) {
    return this
      .contactList(query)
      .then(contacts => contacts[0] ? contacts[0] : null)
    ;
  }

  updateFieldByContactId (contactId, fieldName, fieldValue) {
    const body = {
      id: contactId
    };
    addCustomField(body, fieldName, fieldValue);
    return this.client
      .call('contact_edit', {
        overwrite: 0 // Only overwrite provided fields
      }, 'POST', body)
      .catch(error => console.log('Error occurred when updating contact', JSON.stringify(error, null, 2)))
    ;
  }

  /**
   * @param {int|string} listId  Single ID or list of IDs separated by comma
   * @param {string} email
   * @returns {Promise<object|null>}  Contact data or null if not found
   */
  getContactFromListByEmail (listId, email) {
    return this
      .contactListFirst({
        filters: {
          email: email,
          listid: listId
        }
      })
    ;
  }

  subscribe (body, options) {
    const self = this;
    return self
      .getContactFromListByEmail(options.listIds.join(','), body.email)
      .then(result => {
        if (result) {
          throw new Errors.EmailAlreadyUsed(
            'E-Mail «' + body.email + '» is already used in the list(s): «' + options.listIds + '»'
          );
        }
        return self.contactSync(body, options);
      })
    ;
  }

}

module.exports = ApiHelper;


function addCustomField (body, key, value) {
  body['field[%' + key.toUpperCase() + '%,0]'] = value;
}
