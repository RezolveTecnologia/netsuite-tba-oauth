"use strict";

// Dependencies
//const request = require('request');
const fetch = await import("node-fetch");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

module.exports = NetSuiteOAuth;

/**
 * Constructor
 *
 * @param url
 * @param method
 * @param consumerKey
 * @param consumerSecret
 * @param tokenId
 * @param tokenSecret
 * @param account
 * @param signatureMethod
 * @returns {PromiseLike<ArrayBuffer>}
 * @constructor
 */
function NetSuiteOAuth(
  url,
  method,
  consumerKey,
  consumerSecret,
  tokenId,
  tokenSecret,
  account,
  signatureMethod = "HMAC-SHA256"
) {
  if (!["HMAC-SHA256", "HMAC-SHA1"].includes(signatureMethod))
    throw `Invalid signature method: ${signatureMethod}. Use HMAC-SHA1 or HMAC-SHA256`;

  this.oauth = OAuth({
    consumer: {
      key: consumerKey,
      secret: consumerSecret,
    },
    realm: account,
    signature_method: signatureMethod,
    hash_function(base_string, key) {
      return crypto
        .createHmac(signatureMethod.toLowerCase().replace("hmac-", ""), key)
        .update(base_string)
        .digest("base64");
    },
  });

  this.request_data = {
    url: url,
    method: method,
  };

  this.token = {
    key: tokenId,
    secret: tokenSecret,
  };

  this.headers = this.oauth.toHeader(
    this.oauth.authorize(this.request_data, this.token)
  );
  this.headers["Content-Type"] = "application/json";
}

NetSuiteOAuth.prototype.get = function () {
  return new Promise((resolve, reject) => {
    fetch(this.request_data.url, {
      method: this.request_data.method,
      headers: this.headers,
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

NetSuiteOAuth.prototype.post = function (data) {
  return new Promise((resolve, reject) => {
    fetch(this.request_data.url, {
      method: this.request_data.method,
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

NetSuiteOAuth.prototype.put = function (data) {
  return new Promise((resolve, reject) => {
    fetch(this.request_data.url, {
      method: this.request_data.method,
      headers: this.headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
