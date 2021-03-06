// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '46241355-bb95-46a9-ba6c-42b554d71925',
    managementCertificate: {
      key: 'mockedKey',
      cert: 'mockedCert'
    },
    name: 'Microsoft Azure Internal Consumption',
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
  process.env['AZURE_BATCH_ACCOUNT'] = 'jstesteastus2';
  process.env['AZURE_BATCH_ENDPOINT'] = 'https://jstesteastus2.eastus2.batch.azure.com';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://jstesteastus2.eastus2.batch.azure.com:443')
  .get('/jobs/xplatJob/jobpreparationandreleasetaskstatus?api-version=2016-07-01.3.1&timeout=30')
  .reply(200, "{\r\n  \"odata.metadata\":\"https://jstesteastus2.eastus2.batch.azure.com/$metadata#jobpreparationandreleasetaskstatuslist\",\"value\":[\r\n    {\r\n      \"poolId\":\"xplatTestPool\",\"nodeId\":\"tvm-3850571994_1-20160908t182327z\",\"nodeUrl\":\"https://jstesteastus2.eastus2.batch.azure.com/pools/xplatTestPool/nodes/tvm-3850571994_1-20160908t182327z\",\"jobPreparationTaskExecutionInfo\":{\r\n        \"startTime\":\"2016-09-12T23:28:55.0153604Z\",\"taskRootDirectory\":\"\\\\workitems\\\\xplatjob\\\\job-1\\\\jobprep\",\"taskRootDirectoryUrl\":\"https://jstesteastus2.eastus2.batch.azure.com/pools/xplatTestPool/nodes/tvm-3850571994_1-20160908t182327z/files//workitems/xplatjob/job-1/jobprep\",\"state\":\"running\",\"retryCount\":0\r\n      }\r\n    }\r\n  ]\r\n}", { 'transfer-encoding': 'chunked',
  'content-type': 'application/json;odata=minimalmetadata',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': 'a4fe69b3-70b5-4c40-a7f9-d3443549f190',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': '0f1102f8-75f5-4d48-9c86-71fc72806d72',
  dataserviceversion: '3.0',
  date: 'Mon, 12 Sep 2016 23:28:57 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://jstesteastus2.eastus2.batch.azure.com:443')
  .get('/jobs/xplatJob/jobpreparationandreleasetaskstatus?api-version=2016-07-01.3.1&timeout=30')
  .reply(200, "{\r\n  \"odata.metadata\":\"https://jstesteastus2.eastus2.batch.azure.com/$metadata#jobpreparationandreleasetaskstatuslist\",\"value\":[\r\n    {\r\n      \"poolId\":\"xplatTestPool\",\"nodeId\":\"tvm-3850571994_1-20160908t182327z\",\"nodeUrl\":\"https://jstesteastus2.eastus2.batch.azure.com/pools/xplatTestPool/nodes/tvm-3850571994_1-20160908t182327z\",\"jobPreparationTaskExecutionInfo\":{\r\n        \"startTime\":\"2016-09-12T23:28:55.0153604Z\",\"taskRootDirectory\":\"\\\\workitems\\\\xplatjob\\\\job-1\\\\jobprep\",\"taskRootDirectoryUrl\":\"https://jstesteastus2.eastus2.batch.azure.com/pools/xplatTestPool/nodes/tvm-3850571994_1-20160908t182327z/files//workitems/xplatjob/job-1/jobprep\",\"state\":\"running\",\"retryCount\":0\r\n      }\r\n    }\r\n  ]\r\n}", { 'transfer-encoding': 'chunked',
  'content-type': 'application/json;odata=minimalmetadata',
  server: 'Microsoft-HTTPAPI/2.0',
  'request-id': 'a4fe69b3-70b5-4c40-a7f9-d3443549f190',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'client-request-id': '0f1102f8-75f5-4d48-9c86-71fc72806d72',
  dataserviceversion: '3.0',
  date: 'Mon, 12 Sep 2016 23:28:57 GMT',
  connection: 'close' });
 return result; }]];