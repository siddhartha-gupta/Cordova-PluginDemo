(function(win) {
	function demoClass() {
		var downloadFiles = function() {
				console.log('downloadFiles');
				// To download multiple files
				fileDownloader.downloadFiles({
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

			checkDownloadedFileExist = function() {
				var path = appInstance.getAttribute('libPath') + '/abc/test.jpg';

				fileManager.checkFileExist({
					'source': path,
					'successCallback': function(resp) {
						console.log(resp);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});
			},

			moveDownloadedFile = function() {
				var path = appInstance.getAttribute('libPath') + '/abc/test.jpg';
				var target = appInstance.getAttribute('libPath') + '/test.jpg';

				fileManager.moveFile({
					'source': path,
					'target': target,
					'successCallback': function(resp) {
						console.log(resp);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});
			},

			copyDownloadedFile = function() {
				var path = appInstance.getAttribute('libPath') + '/abc/test.jpg';
				var target = appInstance.getAttribute('libPath') + '/test.jpg';

				fileManager.copyFile({
					'source': path,
					'target': target,
					'successCallback': function(resp) {
						console.log(resp);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});
			},

			renameDownloadedFile = function() {
				var path = appInstance.getAttribute('libPath') + '/abc/test1.jpg';
				var newFileName = 'newfile.jpg';

				fileManager.renameFile({
					'source': path,
					'newFileName': newFileName,
					'successCallback': function(resp) {
						console.log(resp);
					},
					'errorCallback': function(err) {
						console.log(err);
					}
				});
			};

		return {
			downloadFiles: downloadFiles,
			checkDownloadedFileExist: checkDownloadedFileExist,
			moveDownloadedFile: moveDownloadedFile,
			copyDownloadedFile: copyDownloadedFile,
			renameDownloadedFile: renameDownloadedFile
		};
	}
	win.appInstance = win.appInstance || {};
	win.appInstance.demoClass = new demoClass();
})(window);