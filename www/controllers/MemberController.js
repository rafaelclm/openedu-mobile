openedu.controller('MemberController', ['$scope', '$rootScope', 'MemberFactory', 'Codes',
    function MemberController($scope, $rootScope, MemberFactory, Codes) {

        this.photo = {};
        $scope.isChoosePhotoCollapsed = true;
        $scope.session = angular.fromJson(localStorage.session);
        $rootScope.profileImageIsLoaded = false;
        $scope.profileImage = MemberFactory.getPhoto($scope.member.image, $scope.session.sessionId);

        this.logOut = function () {
            localStorage.removeItem('session');
            localStorage.removeItem('member');
            $scope.template = $scope.Templates.HOME;
        };

        this.capturePhoto = function () {
            // Take picture using device camera and retrieve image as base64-encoded string
            window.navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 50,
                destinationType: window.destinationType.DATA_URL,
                targetWidth: 800,
                targetHeight: 800
            });
        }

        this.getPhoto = function () {
            // Retrieve image file location from specified source
            window.navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 50,
                destinationType: destinationType.DATA_URL,
                sourceType: pictureSource.SAVEDPHOTOALBUM,
                targetWidth: 800,
                targetHeight: 800
            });
        }

        function onPhotoDataSuccess(imageData) {

            $rootScope.profileImageIsLoaded = false;
            $scope.isChoosePhotoCollapsed = true;
            $scope.profileImage = "images/loading.gif";

            var params = {
                data: imageData,
                sessionId: angular.fromJson(localStorage.session).sessionId,
                success: function (result) {
                    if (result.code === Codes.MEMBER_UPDATED) {
                        $scope.member = result.entity;
                        localStorage.member = angular.toJson($scope.member);
                        $rootScope.profileImageIsLoaded = false;
                        $scope.profileImage = MemberFactory
                            .getPhoto($scope.member.image, $scope.session.sessionId);
                    }
                },
                error: function () {

                }
            };

            MemberFactory.setPhoto(params);

        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

    }

]);