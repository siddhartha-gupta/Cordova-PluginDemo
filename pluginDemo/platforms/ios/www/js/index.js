/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

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
            completeCallback: function(data) {
                console.log('completeCallback');
                console.log(JSON.stringify(data));
            }
        });
    }
};

app.initialize();