'use strict';

// Dependencies
const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');

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
 function NetSuiteOAuth(url, method, consumerKey, consumerSecret, tokenId, tokenSecret, account, signatureMethod = 'HMAC-SHA256') {
    if (!['HMAC-SHA256', 'HMAC-SHA1'].includes(signatureMethod))
        throw `Invalid signature method: ${signatureMethod}. Use HMAC-SHA1 or HMAC-SHA256`

    this.oauth = OAuth({
        consumer: {
            key: consumerKey,
            secret: consumerSecret
        },
        realm: account,
        signature_method: signatureMethod,
        hash_function(base_string, key) {
            return crypto.createHmac(signatureMethod.toLowerCase().replace('hmac-', ''), key).update(base_string).digest('base64');
        }
    });

    this.request_data = {
        url: url,
        method: method
    };

    this.token = {
        key: tokenId,
        secret: tokenSecret
    };

    this.headers = this.oauth.toHeader(this.oauth.authorize(this.request_data, this.token));
    this.headers['Content-Type'] = 'application/json';
}

NetSuiteOAuth.prototype.get = function() {
    return new Promise((resolve, reject) => {
        request({
            url: this.request_data.url,
            method: this.request_data.method,
            headers: this.headers
        }, function(error, response, body) {
            if (error || response.statusCode.toString()[0] != 2) {
                console.log('Body data:', body);
                reject(body || error);
            }
            else {
                if (typeof body == 'string') body = JSON.parse(body);
                resolve(body || error);
            }
        });

    });
};

NetSuiteOAuth.prototype.post = function(data) {
    return new Promise((resolve, reject) => {
        request({
            url: this.request_data.url,
            method: this.request_data.method,
            json: data,
            headers: this.headers
        }, function(error, response, body) {
            if (error || response.statusCode.toString()[0] != 2) {
                console.log('Body data:', body);
                reject(body || error);
            }
            else {
                if (typeof body == 'string') {
                    try {
                        body = JSON.parse(body);
                    } catch (error){
                        console.log('unable to parse response body');
                        reject(error);
                    }
                }
                resolve(body || error);
            }
        });

    });
};

NetSuiteOAuth.prototype.put = function(data) {
    return new Promise((resolve, reject) => {
        request({
            url: this.request_data.url,
            method: this.request_data.method,
            json: data,
            headers: this.headers
        }, function(error, response, body) {
            if (error || response.statusCode.toString()[0] != 2) {
                console.log('Body data:', body);
                reject(body || error);
            }
            else {
                if (typeof body == 'string') {
                    try {
                        body = JSON.parse(body);
                    } catch (error){
                        console.log('unable to parse response body');
                        reject(error);
                    }
                }
                resolve(body || error);
            }
        });

    });
};
