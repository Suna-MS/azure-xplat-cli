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

/*
* You can test MySQL commands get loaded by xplat by following steps:
* a. Copy the folder to '<repository root>\lib\commands\arm'
* b. Under <repository root>, run 'node bin/azure config mode arm'
* c. Run 'node bin/azure', you should see 'mysql' listed as a command set
* d. Run 'node bin/azure', you should see 'create', "delete", etc 
      showing up in the help text 
*/

'use strict';

var profile = require('../../../util/profile');
var utils = require('../../../util/utils');
var serverUtils = require('./serverUtils');
var firewallRuleUtils = require('./firewallRuleUtils');
var databaseUtils = require('./databaseUtils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
  var log = cli.output;

  var mysql = cli.category('mysql')
    .description($('Commands to manage your Azure MySQL Servers'));

  //================================================================================================================================
  //Server operation
  var server = mysql.category('server')
    .description($('Commands to manage your Azure MySQL Servers'));
    
  //Create mysql server
  server.command('create [resourceGroupName] [location] [serverName] [user] [password] [DTU] [storageMB]')
    .description($('Create a MySQL Server'))
    .usage('[options] <resourceGroupName> <location> <serverName> <user> <password> <DTU> <storageMB> [performanceTier] [version] [tags]')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-l, --location <location>', $('The location of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('-u, --user <user>', $('The admin user name'))
    .option('-p, --password <password>', $('The admin password'))
    .option('--DTU <DTU>', $('the DTU of the server'))
    .option('--storageMB <storageMB>', $('The storageMB'))
    .option('--performanceTier [performanceTier]', $('The edition of the server {Basic | Standard | Premium}'))
    .option('-v, --version [version]', $('The version of the server'))
    .option('-t, --tags [tags]', $('Tags to set to the server. Can be multiple. ' +
      'In the format of \'name=value\'. Name is required and value is optional. ' +
      'For example, -t \'tag1=value1;tag2\'. Providing an empty string \'\' will delete the tags.'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, location, serverName, user, password, dtu, storageMB, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      serverUtils.createServer(cli, log, client, resourceGroupName, location, serverName, user, password, dtu, storageMB, options, _);
    });
    
  //Update mysql server
  server.command('set [resourceGroupName] [serverName] [password]')
    .description($('Reset admin password for a MySQL Server'))
    .usage('[options] <resourceGroupName> <serverName> <password>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('-p, --password <password>', $('The admin password'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, password, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      serverUtils.resetPassword(cli, log, client, resourceGroupName, serverName, password, _);
    });
  
  //Get a mysql server
  server.command('show [resourceGroupName] [serverName] ')
    .description($('Show the infomation of a specific mysql server'))
    .usage('[options] <serverName> <resourceGroupName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function(resourceGroupName, serverName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);
      
      serverUtils.showServer(cli, log, client, resourceGroupName, serverName, _);
    });
    
  //Delete mysql server
  server.command('delete [resourceGroupName] [serverName]')
    .description($('Create a MySQL Server'))
    .usage('[options] <resourceGroupName> <serverName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('--subscription <subscription>', $('the subscription identifier'))
    .execute(function (resourceGroupName, serverName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      serverUtils.deleteServer(cli, log, client, resourceGroupName, serverName, _);
    });
    
  //List mysql servers
  server.command('list')
    .description($('List all MySQL servers under the current subscription [and specified resource group]'))
    .usage('[options] [resourceGroupName]')
    .option('-g, --resourceGroupName [resourceGroupName]', $('Name of the Resource Group'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function(options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);
      
      serverUtils.listServers(cli, log, client, options, _);
    });
  
  //================================================================================================================================
  //Firewall Rule operation
  var firewallRule = server.category('firewall-rule')
    .description($('Commands to manage your Azure MySQL Server Firewall Rules'));
  
  firewallRule.command('add [resourceGroupName] [serverName] [firewallRuleName] [startIPAddress] [endIPAddress]')
    .description($('Add a firewall rule'))
    .usage('[options] <resourceGroupName> <serverName> <firewallRuleName> <startIPAddresss> <endIPAddress>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('--firewallRuleName <firewallRuleName>', $('The firewall rule name'))
    .option('--startIPAddress <startIPAddress>', $('The start ip address of the firewall rule'))
    .option('--endIPAddress <endIPAddress>', $('The end ip address of the firewall rule'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, firewallRuleName, startIPAddress, endIPAddress, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      firewallRuleUtils.addFirewallRule(cli, log, client, resourceGroupName, serverName, firewallRuleName, startIPAddress, endIPAddress, _);
    });
    
  firewallRule.command('delete [resourceGroupName] [serverName] [firewallRuleName]')
    .description($('Delete a firewall rule'))
    .usage('[options] <resourceGroupName> <serverName> <firewallRuleName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('--firewallRuleName <firewallRuleName>', $('The firewall rule name'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, firewallRuleName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      firewallRuleUtils.deleteFirewallRule(cli, log, client, resourceGroupName, serverName, firewallRuleName, _);
    });
    
  firewallRule.command('list [resourceGroupName] [serverName]')
    .description($('List firewall rules'))
    .usage('[options] <resourceGroupName> <serverName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, firewallRuleName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      firewallRuleUtils.listFirewallRules(cli, log, client, resourceGroupName, serverName, _);
    });
  
  //================================================================================================================================
  //Database operation
  var database = mysql.category('database')
    .description($('Commands to manage your Azure MySQL Server Databases'));
  
  database.command('create [resourceGroupName] [serverName] [databaseName]')
    .description($('Create a database'))
    .usage('[options] <resourceGroupName> <serverName> <databaseName> [collationName] [charsetName]')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('-d, --databaseName <databaseName>', $('The database name'))
    .option('--collationName [collationName]', $('The collatin of the database'))
    .option('--charsetName [charsetName>', $('The charset of the database'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, databaseName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      databaseUtils.createDatabase(cli, log, client, resourceGroupName, serverName, databaseName, options, _);
    });
    
  database.command('delete [resourceGroupName] [serverName] [databaseName]')
    .description($('Delete a database'))
    .usage('[options] <resourceGroupName> <serverName> <databaseName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('-d, --databaseName <databaseName>', $('The database name'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, databaseName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      databaseUtils.deleteDatabase(cli, log, client, resourceGroupName, serverName, databaseName, _);
    });
    
  database.command('show [resourceGroupName] [serverName] [databaseName]')
    .description($('Show details of a database'))
    .usage('[options] <resourceGroupName> <serverName> <databaseName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('-d, --databaseName <databaseName>', $('The database name'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, databaseName, options, _) {
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      databaseUtils.showDatabase(cli, log, client, resourceGroupName, serverName, databaseName, _);
    });
    
  database.command('list [resourceGroupName] [serverName]')
    .description($('List databases'))
    .usage('[options] <resourceGroupName> <serverName>')
    .option('-g, --resourceGroupName <resourceGroupName>', $('The resource group of the server'))
    .option('-s, --serverName <serverName>', $('The name of the MySQL server'))
    .option('--subscription <subscription>', $('The subscription identifier'))
    .execute(function (resourceGroupName, serverName, options, _){
      var subscription = profile.current.getSubscription(options.subscription);
      var client = utils.createMySQLManagementClient(subscription);

      databaseUtils.listDatabases(cli, log, client, resourceGroupName, serverName, _);
    });
  
  //================================================================================================================================
};