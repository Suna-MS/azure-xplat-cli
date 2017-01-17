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

var $ = utils.getLocaleString;

exports.createDatabase = function (cli, log, client, resourceGroupName, serverName, databaseName, options, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
    
  if (!databaseName) {
    return cli.missingArgument('databaseName');
  }

  /////////////////////////
  // Prepare properties. //
  /////////////////////////
  var databaseParameters = {
    collation: options.collationName,
    charset: options.charsetName
  };
  
  var progress = cli.interaction.progress(util.format($('Adding Database %s ...'), databaseName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.databases.createOrUpdate(resourceGroupName, serverName, databaseName, databaseParameters, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (!data) {
      log.info($('No database information avaliable.'));
    } else {
      displayOneDatabase(log, resourceGroupName, serverName, data)
    }
  });
  
  if (response.statusCode == 201 || response.statusCode == 200) {
    log.info('Database ' + databaseName + ' is created.');
  } else {
    log.info('Failed in creating database ' + databaseName);
  }
};

exports.deleteDatabase = function (cli, log, client, resourceGroupName, serverName, databaseName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
    
  if (!databaseName) {
    return cli.missingArgument('databaseName');
  }
  
  var progress = cli.interaction.progress(util.format($('Deleting Database %s ...'), databaseName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.databases.deleteMethod(resourceGroupName, serverName, databaseName, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  if (response.statusCode == 200) {
    log.info('Delete success for database ' + databaseName);
  } else if (response.statusCode == 204) {
    log.info('Delete sucess, but no database named ' + databaseName + ' was found');
  } else {
    log.info('Error in deleting database ' + databaseName);
  }
};

exports.showDatabase = function (cli, log, client, resourceGroupName, serverName, databaseName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
  
  if (!databaseName) {
    return cli.missingArgument('databaseName');
  }
  
  var progress = cli.interaction.progress(util.format($('Get information of database %s ... '), databaseName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.databases.get(resourceGroupName, serverName, databaseName, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (!data === 0) {
      log.info($('No database information avaliable.'));
    } else {
      displayOneDatabase(log, resourceGroupName, serverName, data);
    }
  });
};

exports.listDatabases = function (cli, log, client, resourceGroupName, serverName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
  
  var progress = cli.interaction.progress(util.format($('Listing Databases ...')));
  
  var result;
  try {
    result = client.databases.list(resourceGroupName, serverName, _);
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (data.length === 0) {
      log.info($('No database found.'));
    } else {
      data.forEach(function (database) {
        displayOneDatabase(log, resourceGroupName, serverName, database);
      });
    }
  });
};

function displayOneDatabase(log, resourceGroupName, serverName, database) {
  log.data($('ResourceGroupName :'), resourceGroupName);
  log.data($('ServerName        :'), serverName);
  log.data($('DatabaseName      :'), database.name);
  log.data($('Collaiton         :'), database.collation);
  log.data($('Charset           :'), database.charset);
  log.data('');
}