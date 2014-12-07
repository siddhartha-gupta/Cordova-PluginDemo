cordova.define("com.siddharthagupta.filemanager.FileManager", function(require, exports, module) { var cordova = require('cordova'),
    exec = require('cordova/exec');

function FileManager() {}

/**
 * To get absolute path of documents directory
 *
 * @param {Object}
 * successCallback: success callback
 * errorCallback: error callback
 */
FileManager.prototype.documentsPath = function(params) {
	exec(function(result) {
			console.log('documents path: ' + result);
			params.successCallback(result);
		},
		function(error) {
			console.log('error in retrieving docuements path' + error);
			params.errorCallback(error);
		},
		"FileManager",
		"documentsPath", []
	);
};

/**
 * To get absolute path of library directory
 *
 * @param {Object}
 * successCallback: success callback
 * errorCallback: error callback
 */
FileManager.prototype.libraryPath = function(params) {
	exec(function(result) {
			console.log('library path: ' + result);
			params.successCallback(result);
		},
		function(error) {
			console.log('error in retrieving library path' + error);
			params.errorCallback(error);
		},
		"FileManager",
		"libraryPath", []
	);
};

/**
 * To check whether file exist or not
 *
 * @param {Object}
 * source: file path
 * successCallback: success callback
 * errorCallback: error callback
 */
FileManager.prototype.checkFileExist = function(params) {
	exec(function(result) {
			console.log('file found: ' + result);
			params.successCallback(result);
		},
		function(error) {
			console.log('error in file check' + error);
			params.errorCallback(error);
		},
		"FileManager",
		"checkFileExist", [params.source]
	);
};

/**
 * To move file from one dir to another
 *
 * @param {Object}
 * source: existing file path
 * target: desired file path
 * successCallback: success callback
 * errorCallback: error callback
 */
FileManager.prototype.moveFile = function(params) {
	exec(function(result) {
			console.log('file moved successfully: ' + result);
			params.successCallback(result);
		},
		function(error) {
			console.log('error in moving file: ' + error);
			params.errorCallback();
		},
		"FileManager",
		"moveFile", [params.source, params.target]
	);
};

/**
 * To copy file from one dir to another
 *
 * @param {Object}
 * source: existing file path
 * target: desired file path
 * successCallback: success callback
 * errorCallback: error callback
 */
FileManager.prototype.copyFile = function(params) {
	exec(function(result) {
			console.log('file copied successfully: ' + result);
			params.successCallback();
		},
		function(error) {
			console.log('error in copying file: ' + error);
			params.errorCallback();
		},
		"FileManager",
		"copyFile", [params.source, params.target]
	);
};

/**
 * To copy file from one dir to another
 *
 * @param {Object}
 * source: existing file path
 * newFileName: new name for file
 * successCallback: success callback
 * errorCallback: error callback
 */
FileManager.prototype.renameFile = function(params) {
	exec(function(result) {
			console.log('file renamed successfully: ' + result);
			params.successCallback();
		},
		function(error) {
			console.log('error in renaming file: ' + error);
			params.errorCallback();
		},
		"FileManager",
		"renameFile", [params.source, params.newFileName]
	);
};

var fileManager = new FileManager();
module.exports = fileManager;
});
