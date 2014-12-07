(function(win) {
	function app() {
		var libPath = null,
			docPath = null,
			clickEvent = (String(document.ontouchmove) !== 'undefined') ? 'click tap' : 'click',

			initialize = function() {
				document.addEventListener('deviceready', onDeviceReady, false);
			},

			onDeviceReady = function() {
				$('p').off(clickEvent).on(clickEvent, function(event) {
					event.stopPropagation();
					event.preventDefault();

					switch ($(this).attr('id')) {
						case 'downloadSingleFile':
							appInstance.demoClass.downloadSingleFile();
							break;

						case 'downloadMultipleFiles':
							appInstance.demoClass.downloadMultipleFiles();
							break;

						default:
							break;
					}
				});

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