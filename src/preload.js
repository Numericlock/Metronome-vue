const electron = require('electron');

process.once('loaded', () => {
    global.app = electron.remote.app;
    global.fs = require('fs');
    global.path = require('path');
});