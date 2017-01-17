/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';
var util = require('util');
var utils = require('../../../util/utils');
var tagUtils = require('../tag/tagUtils');

var $ = utils.getLocaleString;

exports.showServer = function (cli, log, client, resourceGroupName, serverName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
  
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
  
  var progress = cli.interaction.progress(util.format($('Get information of server %s ...'), serverName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.servers.get(resourceGroupName, serverName, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } catch (e) {
    throw e;
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function(data) {
    if (!data) {
      log.info($('No server named %s found.'), serverName);
    } else {
      displayOneServer(log, data);
    }
  });
};

exports.listServers = function (cli, log, client, options, _) {
  var progress = cli.interaction.progress(util.format($('List servers ...')));
  var result;
  try {
    if (options.resourceGroupName) {
    result = client.servers.listByResourceGroup(options.resourceGroupName, _);
    } else {
    result = client.servers.list(_);
    }
  } catch (e) {
    throw e;
  } finally {
    progress.end();
  }
  
  /*
  cli.interaction.formatOutput(result, function (data) {
    if (data.length === 0) {
      log.info($('No server found.'));
    } else {
      log.table(data, displayAServer);
    }
  });
  */
  
  cli.interaction.formatOutput(result, function (data) {
    if (data.length === 0) {
      log.info($('No server found.'));
    } else {
      data.forEach(function(server) {
        displayOneServer(log, server);
      });
    }
  });
};

exports.createServer = function (cli, log, client, resourceGroupName, location, serverName, user, password, dtu, storageMB, options, _) {

  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
  
  if (!location) {
    return cli.missingArgument('location');
  }
  
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
  
  if (!user) {
    return cli.missingArgument('user');
  }
  
   if (!password) {
    return cli.missingArgument('password');
  }

  /////////////////////////
  // Prepare properties. //
  /////////////////////////
  var serverParameters = {
    location: location,
    administratorLogin: user,
    administratorLoginPassword: password,
    storageMB: parseInt(storageMB),
    version: options.version,
    sku: {
      name: 'skuname',
      size: null,
      family: null,
      tier: options.performanceTier,
      capacity: parseInt(dtu)
    },
    tags: options.tags
  };
  
  var progress = cli.interaction.progress(util.format($('Creating Server %s ...'), serverName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.servers.createOrUpdate(resourceGroupName, serverName, serverParameters, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (data.length === 0) {
      log.info($('No server information avaliable.'));
    } else {
      displayOneServer(log, data);
    }
  });
  
  if (response.statusCode == 201) {
    log.info('Server ' + serverName + ' is created.');
  } else if (response.statusCode == 200) {
    log.info('Server ' + serverName + ' is updated.');
  } else {
    log.info('Failed in creating or updating Server ' + serverName);
  }
};

exports.deleteServer = function (cli, log, client, resourceGroupName, serverName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
  
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
   
  var progress = cli.interaction.progress(util.format($('Deleting Server %s'), serverName));
   
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.servers.deleteMethod(resourceGroupName, serverName, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
   
  if (response.statusCode == 200) {
    log.info('Delete success for server ' + serverName);
  } else if (response.statusCode == 204) {
    log.info('Delete sucess, but no server named ' + serverName + ' was found');
  } else {
    log.info('Error in deleting server ' + serverName);
  }
};

exports.resetPassword = function (cli, log, client, resourceGroupName, serverName, newPassword, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
  
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
  
  if (!newPassword) {
    return cli.missingArgument('password');
  }
   
  /////////////////////////
  // Prepare properties. //
  /////////////////////////
  var serverParameters = {
    administratorLoginPassword: newPassword
  };
  
  var progress = cli.interaction.progress(util.format($('Updating Server %s'), serverName));
   
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.servers.update(resourceGroupName, serverName, serverParameters, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (data.length === 0) {
      log.info($('No server information avaliable.'));
    } else {
      displayOneServer(log, data);
    }
  });
  
  if (response.statusCode == 200) {
    log.info('Server ' + serverName + ' is updated.');
  } else {
    log.info('Error in updating server ' + serverName);
  }
};

function displayAServer(row, server) {
  row.cell($('ServerName'), server.name);
  row.cell($('Location'), server.location);
  row.cell($('Sku'), server.sku.tier);
  row.cell($('DTU'), server.sku.capacity);
  row.cell($('StorageMB'), server.storageMB);
  row.cell($('Version'), server.version);
  row.cell($('UserVisibleState'), server.userVisibleState);
  row.cell($('FullyQualifiedDomainName'), server.fullyQualifiedDomainName);
  row.cell($('Tags'), tagUtils.getTagsInfo(server.tags));
}

function displayOneServer(log, server) {
  log.data($('Server name              :'), server.name);
  log.data($('Location                 :'), server.location);
  log.data($('Sku                      :'), server.sku.tier);
  log.data($('DTU                      :'), server.sku.capacity);
  log.data($('StorageMB                :'), server.storageMB);
  log.data($('Version                  :'), server.version);
  log.data($('UserVisibleState         :'), server.userVisibleState);
  log.data($('FullyQualifiedDomainName :'), server.fullyQualifiedDomainName);
  log.data($('Tags                     :'), tagUtils.getTagsInfo(server.tags));
  log.data($('Id                       :'), server.id);
  log.data('');
}