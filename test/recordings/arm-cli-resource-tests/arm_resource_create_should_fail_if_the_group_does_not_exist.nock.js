// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '00977cdb-163f-435f-9c32-39ec8ae61f4d',
    name: 'node',
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
  process.env['AZURE_ARM_TEST_LOCATION'] = 'West US';
  process.env['AZURE_ARM_TEST_SQL_RESOURCE_LOCATION'] = 'West US';
  process.env['AZURE_ARM_TEST_WEBSITES_RESOURCE_LOCATION'] = 'South Central US';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xTestResource8543/providers/Microsoft.Web/sites/xTestGrpRes6337?api-version=2014-04-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xTestResource8543' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': 'b13ff517-8f8b-4ccf-9293-0bdf4a8f4087',
  'x-ms-correlation-request-id': 'b13ff517-8f8b-4ccf-9293-0bdf4a8f4087',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T224816Z:b13ff517-8f8b-4ccf-9293-0bdf4a8f4087',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 22:48:15 GMT',
  connection: 'close',
  'content-length': '109' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xTestResource8543/providers/Microsoft.Web/sites/xTestGrpRes6337?api-version=2014-04-01')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xTestResource8543' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': 'b13ff517-8f8b-4ccf-9293-0bdf4a8f4087',
  'x-ms-correlation-request-id': 'b13ff517-8f8b-4ccf-9293-0bdf4a8f4087',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T224816Z:b13ff517-8f8b-4ccf-9293-0bdf4a8f4087',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 22:48:15 GMT',
  connection: 'close',
  'content-length': '109' });
 return result; },
function (nock) { 
var result = 
nock('http://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xTestResource8543/providers/Microsoft.Web/sites/xTestGrpRes6337?api-version=2014-04-01', '*')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xTestResource8543' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': '46567793-a4c2-46c7-863e-e723ba870c5e',
  'x-ms-correlation-request-id': '46567793-a4c2-46c7-863e-e723ba870c5e',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T224818Z:46567793-a4c2-46c7-863e-e723ba870c5e',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 22:48:17 GMT',
  connection: 'close',
  'content-length': '109' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/00977cdb-163f-435f-9c32-39ec8ae61f4d/resourcegroups/xTestResource8543/providers/Microsoft.Web/sites/xTestGrpRes6337?api-version=2014-04-01', '*')
  .reply(404, "{\"error\":{\"code\":\"ResourceGroupNotFound\",\"message\":\"Resource group 'xTestResource8543' could not be found.\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-failure-cause': 'gateway',
  'x-ms-request-id': '46567793-a4c2-46c7-863e-e723ba870c5e',
  'x-ms-correlation-request-id': '46567793-a4c2-46c7-863e-e723ba870c5e',
  'x-ms-routing-request-id': 'CENTRALUS:20160130T224818Z:46567793-a4c2-46c7-863e-e723ba870c5e',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 30 Jan 2016 22:48:17 GMT',
  connection: 'close',
  'content-length': '109' });
 return result; }]];
 exports.randomTestIdsGenerated = function() { return ['xTestResource8543','xTestGrpRes6337'];};