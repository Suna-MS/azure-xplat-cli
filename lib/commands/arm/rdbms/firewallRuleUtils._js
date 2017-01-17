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

exports.addFirewallRule = function (cli, log, client, resourceGroupName, serverName, firewallRuleName, startIPAddress, endIPAddress, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
    
  if (!firewallRuleName) {
    return cli.missingArgument('firewallRuleName');
  }
    
  if (!startIPAddress) {
    return cli.missingArgument('startIPAddress');
  }
    
   if (!endIPAddress) {
    return cli.missingArgument('endIPAddress');
  }

  /////////////////////////
  // Prepare properties. //
  /////////////////////////
  var firewallRuleParameters = {
    startIpAddress: startIPAddress,
    endIpAddress: endIPAddress
  };
  
  var progress = cli.interaction.progress(util.format($('Adding Firewall Rule %s ...'), firewallRuleName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.firewallRules.createOrUpdate(resourceGroupName, serverName, firewallRuleName, firewallRuleParameters, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (!data) {
      log.info($('No firewall rule information avaliable.'));
    } else {
      displayOneFirewallRule(log, resourceGroupName, serverName, data)
    }
  });
  
  if (response.statusCode == 201 || response.statusCode == 200) {
    log.info('Firewall rule ' + firewallRuleName + ' is added.');
  } else {
    log.info('Failed in adding firewall rule ' + firewallRuleName);
  }
};

exports.deleteFirewallRule = function (cli, log, client, resourceGroupName, serverName, firewallRuleName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
    
  if (!firewallRuleName) {
    return cli.missingArgument('firewallRuleName');
  }
  
  var progress = cli.interaction.progress(util.format($('Deleting Firewall Rule %s ...'), firewallRuleName));
  
  var callbackArgs = [];
  var result, response;
  try {
    callbackArgs = client.firewallRules.deleteMethod(resourceGroupName, serverName, firewallRuleName, [_]);
    result = callbackArgs[0];
    response = callbackArgs[2];
  } finally {
    progress.end();
  }
  
  if (response.statusCode == 200) {
    log.info('Delete success for firewall rule ' + firewallRuleName);
  } else if (response.statusCode == 204) {
    log.info('Delete sucess, but no firewall rule named ' + firewallRuleName + ' was found');
  } else {
    log.info('Error in deleting firewall rule ' + firewallRuleName);
  }
};

exports.listFirewallRules = function (cli, log, client, resourceGroupName, serverName, _) {
  if (!resourceGroupName) {
    return cli.missingArgument('resourceGroupName');
  }
    
  if (!serverName) {
    return cli.missingArgument('serverName');
  }
  
  var progress = cli.interaction.progress(util.format($('Listing Firewall Rules ...')));
  
  var result;
  try {
    result = client.firewallRules.list(resourceGroupName, serverName, _);
  } finally {
    progress.end();
  }
  
  cli.interaction.formatOutput(result, function (data) {
    if (data.length === 0) {
      log.info($('No firewall rule found.'));
    } else {
      data.forEach(function (rule) {
        displayOneFirewallRule(log, resourceGroupName, serverName, rule);
      });
    }
  });
};

function displayOneFirewallRule(log, resourceGroupName, serverName, rule) {
  log.data($('ResourceGroupName :'), resourceGroupName);
  log.data($('ServerName        :'), serverName);
  log.data($('StartIpAddress    :'), rule.startIpAddress);
  log.data($('EndIpAddress      :'), rule.endIpAddress);
  log.data($('FirewallRuleName  :'), rule.name);
  log.data('');
}