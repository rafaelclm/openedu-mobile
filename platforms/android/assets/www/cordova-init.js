var pictureSource;
var destinationType;
var fileSystem;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 1, onFileSystemSuccess, fail);
    
}

function onFileSystemSuccess(fileSystem) {

    window.fileSystem = fileSystem;
    

}

function onResolveSuccess(fileEntry) {
    alert(fileEntry.name);
}

function fail(evt) {
    alert(evt.target.error.code);
}