cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.tuxpan.foregroundcameragalleryplugin/www/CameraConstants.js",
        "id": "com.tuxpan.foregroundcameragalleryplugin.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/com.tuxpan.foregroundcameragalleryplugin/www/CameraPopoverOptions.js",
        "id": "com.tuxpan.foregroundcameragalleryplugin.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/com.tuxpan.foregroundcameragalleryplugin/www/Camera.js",
        "id": "com.tuxpan.foregroundcameragalleryplugin.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/com.tuxpan.foregroundcameragalleryplugin/www/CameraPopoverHandle.js",
        "id": "com.tuxpan.foregroundcameragalleryplugin.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.tuxpan.foregroundcameragalleryplugin": "0.1.1"
}
// BOTTOM OF METADATA
});