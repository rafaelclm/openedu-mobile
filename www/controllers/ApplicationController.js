var ApplicationCotroller = openedu.controller('ApplicationController', ['$scope', '$rootScope', 'Templates', 'MemberFactory', 'Codes',
    function ApplicationController($scope, $rootScope, Templates, MemberFactory, Codes) {

        $scope.Templates = Templates;
        $rootScope.template;

        setTimeout(function() {
            console.log(window.paths);
            $scope.$apply(function() {
                $scope.entries = window.paths;
            });
        }, 5000);

        moment.lang('pt-BR');
        $rootScope.moment = moment;

        this.memberSignIn = {};
        this.memberSignUp = {};
        this.birthDate = {
            day: null,
            month: null,
            year: null
        };

        $rootScope.inProgress = false;

        if (localStorage.session !== undefined) {

            var session = angular.fromJson(localStorage.session);
            getMe(session.sessionId);

        } else {
            $rootScope.template = Templates.HOME;
        }

        this.signIn = function() {

            $rootScope.inProgress = true;

            var params = {
                controller: this,
                data: this.memberSignIn,
                success: function(result) {

                    if (result.code === Codes.SESSION_CREATED) {

                        var session = result.entity;
                        localStorage.session = angular.toJson(session);
                        getMe(session.sessionId);
                        $rootScope.template = Templates.USER_AREA_HOME;

                    } else if (result.code === Codes.NOT_EXISTS_MEMBER) {

                    }

                    $rootScope.inProgress = false;

                },
                error: function() {
                    $rootScope.inProgress = false;
                }
            };

            MemberFactory.signIn(params);

        };

        this.signUp = function() {
            
            $rootScope.inProgress = true;
            
            var params = {
                controller: this,
                data: this.memberSignUp,
                success: function(result) {

                    if (result.code === Codes.SESSION_CREATED) {

                        localStorage.session = angular.toJson(result.entity);
                        $rootScope.template = Templates.USER_AREA_HOME;

                    } else if (result.code === Codes.NOT_EXISTS_MEMBER) {

                    }
                    
                    $rootScope.inProgress = false;
                    
                },
                error: function() {
                    $rootScope.inProgress = false;
                }
            };

            MemberFactory.signUp(params);
        };

        function getMe(sessionId) {
            var params = {
                sessionId: sessionId,
                success: function(result) {

                    if (result.code === Codes.EXISTS_SESSION) {

                        $scope.member = result.entity;
                        $scope.profileImage = MemberFactory.getPhoto($scope.member.image, this.sessionId);
                        $rootScope.template = Templates.USER_AREA_HOME;

                    } else if (result.code === Codes.NOT_EXISTS_SESSION) {
                        $rootScope.template = Templates.HOME;
                    }

                },
                error: function() {
                    $rootScope.template = Templates.HOME;
                }
            };

            MemberFactory.me(params);

        }

    }
]);