openedu.service('Menu', ['Templates',

    function (Templates) {
        return [
            {
                title: "Tutoriais",
                icon: "icon-news"
            },
            {
                title: "Criar um Tutorial",
                icon: "icon-note",
                submenu: "Tutoriais/",
                template: Templates.CREATE_TUTORIAL
            }
        ];
}]);