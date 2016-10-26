# ActiveCampaign API Client for Node.js

[![npm version](https://badge.fury.io/js/activecampaign-api.svg)](http://badge.fury.io/js/activecampaign-api)


This Node.js module provides lightweight client for ActiveCampaign API with
convenient Promise interface as well as API helper with useful functions.


## Features

- Integrates ActiveCampaign API to Node.js
- Provides Promise interface out of the box
- Has useful convenient helper functions
- Throws sensible errors
- Minimum dependencies


## Installation

### Install library with *npm*

`npm i -S activecampaign-api`


## Usage

### Using API client directly

```js

// Require the module.
const activeCampaignApi = require('activecampaign-api');

// Instantiate a new client.
const activeCampaignApiClient = new activeCampaignApi.ApiClient({
  // Pass your account name and secret key
  accountName: 'myaccountname',
  key: '6ad3...835d'
});

// Listing all active contacts from the list.
activeCampaignApiClient
  .call('contact_list', {
    filters: {
      listid: 4,
      status: 1  // 1 = active
    }
  }, 'GET')
  .then(response => {
    // Handle the response...
    console.log(response);
  })
;

// Adding contact to the list.
activeCampaignApiClient
  .call('contact_add', {}, 'POST', {
    email: 'email@example.com',
    first_name: 'Jack',
    last_name: 'Bauer',
    'p[4]': '4' // List ID
  })
  .then(response => {
    // Handle the response...
    console.log(response);
  })
;

```

### Using API helper functions

```js

// Require the module.
const activeCampaignApi = require('activecampaign-api');

// Instantiate a new client.
const activeCampaignApiClient = new activeCampaignApi.ApiClient({
  // See example above for details
});

// Instantiate a helper instance, pass API client instance to it.
const activeCampaignApiHelper = new activeCampaignApi.ApiHelper(activeCampaignApiClient);

activeCampaignApiHelper
  .subscribe({
    email: 'email@example.com',
    first_name: 'Jack',
    last_name: 'Bauer'
  }, {
    listIds: [4], // You can pass multiple list IDs here
    
    // Passing custom fields
    customFields: {
      company_name: 'CTU',
      utm_campaign: 'campaign-name'
    }
  })
  .then(response => {
    // Handle the response...
    console.log(response);
  })
  .catch(error => {
    
    if (error instanceof activeCampaignApi.Errors.EmailAlreadyUsed) {
      // E-Mail is already subscribed to the specified list
    } else {
      // Some other error
    }
    
    // Alternative syntax:
    if ('EmailAlreadyUsed' == error.name) {
    }
    
  })
;
```

Please see the source code for more details and helper functions.


## Feedback

If you have found a bug or have another issue with the library —
please [create an issue][new-issue].

If you have a question regarding the library or it's integration with your project —
consider asking a question at [StackOverflow][so-ask] and sending me a
link via [E-Mail][email]. I will be glad to help.

Have any ideas or propositions? Feel free to contact me by [E-Mail][email].

Cheers!


## Support

If you like this library consider to add star on [GitHub repository][repo-gh].

Thank you!


## License

The MIT License (MIT)

Copyright (c) 2016 Slava Fomin II, BETTER SOLUTIONS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

  [so-ask]:        http://stackoverflow.com/questions/ask?tags=node.js,javascript
  [email]:         mailto:s.fomin@betsol.ru
  [new-issue]:     https://github.com/betsol/node-activecampaign-api/issues/new
  [repo-gh]:       https://github.com/betsol/node-activecampaign-api
