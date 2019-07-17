# netsuite-tba-oauth
NetSuite Token Based Authentication Module

## Introduction:
This auxiliary module abstracts the authentication mechanism used by NetSuite Restlets.

## Supported authentication methods:
* Token Based Authentication (TBA)
* Note: NLAuth not supported. Use the netsuite-restlet module if you need NLAuth authentication.

## Supported Restlet methods:

GET (get function)
POST (post function)
PUT (put function)

## Installation

Open a terminal session and enter the following command:

``npm install netsuite-tba-oauth --save``

## Usage

Example of GET request

```javascript
const NetSuiteOauth = require('netsuite-tba-oauth');

const url = 'restlet-url';
const method = 'GET';
const consumerKey = 'your-consumer-key';
const consumerSecret = 'your-consumer-secret';
const tokenId = 'token-id';
const tokenSecret = 'token-secret';
const account = 'account Id';

const oauth = new NetSuiteOauth(url, method, consumerKey, consumerSecret, tokenId, tokenSecret, account);

oauth.get().then(response => console.log(response));
```

Example of POST request

```javascript
const NetSuiteOauth = require('netsuite-tba-oauth');

const url = 'restlet-url';
const method = 'GET';
const consumerKey = 'your-consumer-key';
const consumerSecret = 'your-consumer-secret';
const tokenId = 'token-id';
const tokenSecret = 'token-secret';
const account = 'account Id';

const oauth = new NetSuiteOauth(url, method, consumerKey, consumerSecret, tokenId, tokenSecret, account);
const data = {key: 'value'};

oauth.post(data).then(response => console.log(response));
```





