(function(win) {
	function app() {
		var initialize = function() {
				document.addEventListener('deviceready', onDeviceReady, false);
			},

			onDeviceReady = function() {
				console.log('on deviceready');

				fileManager.documentsPath({
					'successCallback': function(path) {
						console.log(path);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});

				fileManager.libraryPath({
					'successCallback': function(path) {
						console.log(path);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});

				// To download single file
				/*fileDownloader.downloadFile({
					'url': 'http://hd.wallpaperswide.com/thumbs/fire_fist_vs_water_fist-t2.jpg',
					'fileName': 'test.jpg',
					'directoryName': 'abc',
					'successCallback': function(data) {
						console.log('successCallback');
						console.log(data);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});*/

				// To download multiple files
				fileDownloader.downloadMultipleFiles({
					data: [{
						'url': 'http://hd.wallpaperswide.com/thumbs/fire_fist_vs_water_fist-t2.jpg',
						'fileName': 'test.jpg',
						'directoryName': 'abc',
					}, {
						'url': 'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/new-wallpaper-3.jpg',
						'fileName': 'test1.jpg',
						'directoryName': 'abc',
					}],
					'successCallback': function(data) {
						console.log('successCallback');
						console.log(data);
					},
					'errorCallback': function(err) {
						console.log(err);
					},
					'completeCallback': function(data) {
						console.log('completeCallback');
						console.log(JSON.stringify(data));
					}
				});
			},

			getAttribute = function(attr) {

			};

		return {
			initialize: initialize,
			onDeviceReady: onDeviceReady,
			getAttribute: getAttribute
		};
	}
	win.app = new app();

	win.app.initialize();
})(window);