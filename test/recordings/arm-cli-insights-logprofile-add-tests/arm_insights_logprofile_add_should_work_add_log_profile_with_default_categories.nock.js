// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '1a66ce04-b633-4a0b-b2bc-a912ec8986a6',
    name: 'Monitoring vNext Test Environment Services 03',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: [],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/providers/microsoft.insights/logprofiles/default?api-version=2016-03-01', '*')
  .reply(200, "{\"id\":\"/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/logprofiles/default\",\"name\":\"default\",\"location\":null,\"tags\":null,\"properties\":{\"storageAccountId\":\"/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/fixtest2/providers/Microsoft.Storage/storageAccounts/stofixtest2\",\"serviceBusRuleId\":\"/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/Default-ServiceBus-EastUS/providers/Microsoft.ServiceBus/namespaces/testshoeboxeastus/authorizationrules/RootManageSharedAccessKey\",\"locations\":[\"global\",\"eastus\"],\"categories\":[\"Action\",\"Delete\",\"Write\"],\"retentionPolicy\":{\"enabled\":true,\"days\":10}}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '630',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '97af272e-a696-4ef1-987d-9a5254a04874',
  server: 'Microsoft-IIS/8.5',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': 'bbd74785-e24d-47d1-b72e-534aea6cb3fd',
  'x-ms-routing-request-id': 'WESTUS:20160323T194614Z:bbd74785-e24d-47d1-b72e-534aea6cb3fd',
  date: 'Wed, 23 Mar 2016 19:46:14 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/providers/microsoft.insights/logprofiles/default?api-version=2016-03-01', '*')
  .reply(200, "{\"id\":\"/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/logprofiles/default\",\"name\":\"default\",\"location\":null,\"tags\":null,\"properties\":{\"storageAccountId\":\"/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/fixtest2/providers/Microsoft.Storage/storageAccounts/stofixtest2\",\"serviceBusRuleId\":\"/subscriptions/1a66ce04-b633-4a0b-b2bc-a912ec8986a6/resourceGroups/Default-ServiceBus-EastUS/providers/Microsoft.ServiceBus/namespaces/testshoeboxeastus/authorizationrules/RootManageSharedAccessKey\",\"locations\":[\"global\",\"eastus\"],\"categories\":[\"Action\",\"Delete\",\"Write\"],\"retentionPolicy\":{\"enabled\":true,\"days\":10}}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '630',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-ms-request-id': '97af272e-a696-4ef1-987d-9a5254a04874',
  server: 'Microsoft-IIS/8.5',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': 'bbd74785-e24d-47d1-b72e-534aea6cb3fd',
  'x-ms-routing-request-id': 'WESTUS:20160323T194614Z:bbd74785-e24d-47d1-b72e-534aea6cb3fd',
  date: 'Wed, 23 Mar 2016 19:46:14 GMT',
  connection: 'close' });
 return result; }]];