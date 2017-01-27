(function() {

    var pubSub = {
        handlers: [],

        subscribe: function(event, fn) {
            this.handlers.push({
                event: event,
                handler: fn
            });
        },

        publish: function(event, k) {
            pubSub.handlers.forEach(function(fn) {
                if (fn.event === event) {
                    fn.handler.call(fn, k);
                };
            });
        }
    };



    var chatController = {

        onKeyUpEvent: function(e) {
            if (chatController.isEnterKey(e)) {

                var message = factory.createMessageElement();
                pubSub.publish("addMessage", message);
                pubSub.publish("renderView", chatModel.getMessages());

            } else {
                chatModel.setDataMessage(e.srcElement.value);
            }
        },

        isEnterKey: function(e) {
            return e.keyCode === 13;
        }

    };

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
            this.inputEle.addEventListener("keyup", this.publishClick);
        },

        publishClick: function(e) {
            pubSub.publish("keyEvent", e);
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
        },

        getMessages: function() {
          return this.messages;
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

    var factory = messageFactory(),
        _pubSub = pubSub,
        _controller = chatController,
        _model = chatModel,
        _view = chatView;

    _pubSub.subscribe("keyEvent", _controller.onKeyUpEvent);
    _pubSub.subscribe("addMessage", _model.addMessage.bind(_model));
    _pubSub.subscribe("renderView", _view.render.bind(_view));

    _view.init();

})();
