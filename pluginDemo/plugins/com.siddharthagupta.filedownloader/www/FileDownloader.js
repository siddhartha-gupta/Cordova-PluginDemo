var cordova = require('cordova'),
	exec = require('cordova/exec');

(function(win, module) {
	function FileDownloader() {}

	FileDownloader.prototype = function() {
		var usingMultiFileInterface = false,
			filesToDownload = [],
			downloadedData = [],
			successCallback = null,
			errorCallback = null,
			completeCallback = null,

			/**
			 * download mutiple files at once
			 *
			 * @params {Object}
			 * data - arr object contain info of files to download
			 *	data[0].url, data[0].fileName, data[0].directoryName
			 * successCallback: callback fired after every file, if file is downloaded successfully
			 * errorCallback: callback fired after every file, if file is not downloaded successfully
			 * completeCallback: callback when all files are downloaded
			 */
			downloadMultipleFiles = function(params) {
				resetAttrs();

				usingMultiFileInterface = true;
				filesToDownload = params.data.slice(0);
				successCallback = params.successCallback || null;
				errorCallback = params.errorCallback || null;
				completeCallback = params.completeCallback || null;
				downloadRecursively();
			},

			downloadRecursively = function() {
				console.log('downloadRecursively');
				if (usingMultiFileInterface) {
					if (filesToDownload.length > 0) {
						downloadFile({
							'url': filesToDownload[0].url,
							'fileName': filesToDownload[0].fileName,
							'directoryName': filesToDownload[0].directoryName,
							'successCallback': successCallback,
							'errorCallback': errorCallback
						});
						filesToDownload.splice(0, 1);
					} else {
						completeCallback(downloadedData);
					}
				} else {
					resetAttrs();
				}
			},

			/**
			 * download single file
			 *
			 * @params {Object}
			 * url, fileName, directoryName
			 * successCallback: error callback
			 * errorCallback: error callback
			 */
			downloadFile = function(params) {
				if (!usingMultiFileInterface) {
					successCallback = params.successCallback || null;
					errorCallback = params.errorCallback || null;
				}

				exec(function(data) {
						console.log('fileDownloader success');
						downloadedData.push(data);
						onDownloadSuccess(data);
					},
					function(error) {
						console.log("fileDownloader error: " + error);
						downloadedData.push(error);
					},
					"FileDownloader",
					"downloadFile", [params.url, params.fileName, params.directoryName]
				);
			},

			onDownloadSuccess = function(data) {
				successCallback(data);
				downloadRecursively();
			},

			onDownloadError = function(err) {
				errorCallback(error);
				downloadRecursively();
			},

			resetAttrs = function() {
				usingMultiFileInterface = false;
				filesToDownload.length = 0;
				downloadedData.length = 0;
				successCallback = null;
				errorCallback = null;
				completeCallback = null;
			};


		return {
			'downloadMultipleFiles': downloadMultipleFiles,
			'downloadFile': downloadFile
		};
	}();

	win.fileDownloader = new FileDownloader();
	module.exports = fileDownloader;
})(window, module);