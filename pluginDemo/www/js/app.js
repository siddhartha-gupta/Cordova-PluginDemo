(function(win) {
	function app() {
		var libPath = null,
			docPath = null,
			clickEvent = (String(document.ontouchmove) !== 'undefined') ? 'click tap' : 'click',

			initialize = function() {
				document.addEventListener('deviceready', onDeviceReady, false);
			},

			onDeviceReady = function() {
				$('p').off(clickEvent).on(clickEvent, fireClickedFunc);

				fileManager.documentsPath({
					'successCallback': function(path) {
						console.log(path);
						docPath = path;
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});

				fileManager.libraryPath({
					'successCallback': function(path) {
						console.log(path);
						libPath = path;
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});
			},

			fireClickedFunc = function() {
				event.stopPropagation();
				event.preventDefault();

				switch ($(this).attr('id')) {
					case 'downloadFiles':
						appInstance.demoClass.downloadFiles();
						break;

					case 'checkDownloadedFileExist':
						appInstance.demoClass.checkDownloadedFileExist();
						break;

					case 'moveDownloadedFile':
						appInstance.demoClass.moveDownloadedFile();
						break;

					case 'copyDownloadedFile':
						appInstance.demoClass.copyDownloadedFile();
						break;

					case 'renameDownloadedFile':
						appInstance.demoClass.renameDownloadedFile();
						break;

					default:
						break;
				}

			},

			getAttribute = function(attr) {
				switch (attr) {
					case 'libPath':
						return libPath;

					case 'docPath':
						return docPath;

					case 'clickEvent':
						return clickEvent;

					default:
						return false;
				}
			};

		return {
			initialize: initialize,
			onDeviceReady: onDeviceReady,
			getAttribute: getAttribute
		};
	}
	win.appInstance = new app();

	win.appInstance.initialize();
})(window);