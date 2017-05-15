(function() {

        var pubSub = {
            events: [],

            publish: function(event, data) {
                this.events.map(function(e) {
                    if (e.name === event) {
                        e.fn.call(e.scope, data);
                    }
                });
            },

            subscribe: function(event, fn, scope) {

                var e = {
                    name: event,
                    fn: fn || null,
                    scope: scope || this
                };

                this.events.push(e);

            }


        };

    module.exports = pubSub;
})();
