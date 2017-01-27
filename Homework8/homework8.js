(function() {

    var pubSub = {
        handlers: [],

        subscribe: function(fn) {
            this.handlers.push(fn);
        },

        unsubscribe: function(fn) {
            this.handlers = this.handlers.filter(
                function(item) {
                    if (item !== fn) {
                        return item;
                    }
                }
            )
        },

        publish: function(o, thisObj) {
            var scope = thisObj || window;
            console.log(o)
            pubSub.handlers.forEach(function(item) {
                item.call(scope, o);
            });
        }
    };



    var chatController = {

        onKeyUpEvent: function(e) {
            if (chatController.isEnterKey(e)) {

                var message = factory.createMessageElement();
                chatModel.addMessage(message);

                chatView.render(chatModel.messages);

            } else {
                chatModel.setDataMessage(e.srcElement.value);
            }
        },

        isEnterKey: function(e) {
            return e.keyCode === 13;
        }

    };

    pubSub.subscribe(chatController.onKeyUpEvent)

    var chatView = {

        displayEle: null,
        inputEle: null,

        init: function() {
            this.initElements();
            this.initListener();
        },

        initElements: function() {
            this.displayEle = document.querySelector('.js-messages');
            this.inputEle = document.querySelector('.js-input');
        },

        initListener: function() {
            this.inputEle.addEventListener("keyup", pubSub.publish);
        },

        render: function(m) {
            var me = this;

            m.map(function(el) {
                me.displayEle.appendChild(el);
            });

            this.clearInput();
        },

        clearInput: function() {
            this.inputEle.value = "";
        }

    };

    var chatModel = {

        messages: [],

        data: {
            message: "",
            pictureUrl: ""
        },


        setDataMessage: function(m) {
            this.data.message = m;
        },

        getDataMessage: function() {
            return this.data.message;
        },

        addMessage: function(m) {
            this.messages.push(m);
        }

    };

    var messageFactory = function() {
        return {
            ele: null,

            init: function() {
                this.ele = document.createElement('div');
                this.ele.className = 'slack__chat-display__chat-history__chat-item';
            },

            setMessageText: function() {
                this.ele.innerText = chatModel.getDataMessage();
            },

            createMessageElement: function() {
                this.init();
                this.setMessageText();
                return this.ele;
            }
        }
    };

    var factory = messageFactory();
    chatView.init();

})();
