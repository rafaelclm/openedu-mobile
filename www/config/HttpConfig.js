openedu.service('HttpConfig', [

    function () {

        return {
            HOST: 'http://192.168.1.42',
            PORT: ':8084',
            PATH: '/openedu/rest/',
            getBaseURI: function () {
                return this.HOST + this.PORT + this.PATH;
            }
        };

    }]);