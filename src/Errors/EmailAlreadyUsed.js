
const ActiveCampaignError = require('./ActiveCampaignError');


module.exports = class EmailAlreadyUsed extends ActiveCampaignError {
  constructor (message) {
    super(message || 'E-Mail is already used');
  }
};
