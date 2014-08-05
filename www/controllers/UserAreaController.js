openedu.controller('UserAreaController', ['$scope', '$rootScope', 'Menu',
    function UserAreaController($scope, $rootScope, Menu) {

        this.template = $scope.Templates.USER_AREA_HOME_CONTENT;
        this.sidebar = true;
        this.showMenu = false;
        this.viewGallery = false;
        this.backTemplate;
        this.menu = Menu;

        this.menuTree = angular.fromJson(sessionStorage.getItem("menu"));

        if (this.menuTree === null) {
            this.menuTree = ["home"];
        }

        this.setTemplate = function (template) {
            this.backTemplate = this.template;
            this.template = template;
        };

        this.logOut = function () {
            localStorage.removeItem('session');
            localStorage.removeItem('member');
            $rootScope.template = $scope.Templates.HOME;
        };

        // Ao clicar em um item do menu, adiciona na lista da árvore do menu o nome do item
        this.MenuClick = function (title, submenu, template) {
            if (template) {
                this.template = template;
            } else {
                if (this.inputTitle) {

                    var stringSubmenu;

                    if (submenu) {
                        stringSubmenu = submenu;
                    } else {
                        stringSubmenu = ""
                    }; // Verifica se há um submenu

                    var array = stringSubmenu.split("/");
                    this.menuTree = ["home"];

                    for (var i = 0; i < array.length - 1; i++) {
                        this.menuTree.push(array[i]);
                    }

                    this.inputTitle = "";
                }

                this.menuTree.push(title);
                SaveMenuTreeSessionStorage(this.menuTree);
            }
        };

        // Volta um passo atrás da árvore do menu
        this.MenuTreeUndo = function () {
            this.menuTree.pop();
            SaveMenuTreeSessionStorage(this.menuTree);
        };

        // Verifica se o index que foi passado é o ultimo da árvore do menu
        this.IsMenuIndex = function (index) {
            if (index === (this.menuTree.length - 1)) {
                return true;
            } else {
                return false;
            }
        };

        // Salva na sessão a árvore do menu
        function SaveMenuTreeSessionStorage(menuTree) {
            sessionStorage.setItem("menu", angular.toJson(menuTree));
        }

        // 
        this.MenuTreeClick = function (index) {
            this.menuTree.splice(index + 1);
            SaveMenuTreeSessionStorage(this.menuTree);
        };

        /* Mostra os itens do menu
    // Prepara algumas variáveis
    // 
    // Verifica se o nome do item clicado é o mesmo da árvore do submenu */
        this.ShowMenuItem = function (submenu) {
            var menuTree = "";

            if (submenu) {
                submenu = "home/" + submenu;
            } else {
                submenu = "home/";
            }; // Verifica se há um submenu


            for (var i = 0; i < this.menuTree.length; i++) {
                menuTree = menuTree + this.menuTree[i] + "/";
            }

            if (!this.inputTitle) {
                if (submenu === menuTree) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }

        };

}]);