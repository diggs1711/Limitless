;
(function() {

    var request = {

        init: function() {
            this.initEle();
            this.initEvents();
        },

        initEle: function() {
            this.btn = $('.js-get-data');
        },

        initEvents: function() {
            var self = this;
            this.btn.on('click', self.fetchData.bind(self, "./sys/Api_Handler.php"));
        },

        fetchData: function(url) {
            var self = this;
            $.ajax({
                url: url,
                type: 'POST',
            }).done(self.onData);
        },

        onData: function(data) {
            console.log(data);
        }

    }
    
    request.init();

})();
