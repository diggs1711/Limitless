(function() {

    var pubSub = {
        handlers: [],

        subscribe: function(event, fn, scope) {
            scope = scope || fn;

            if (this.handlers.length === 0) {
                this.addEvent(event, fn, scope);
            } else {
            	if(!this.checkIfElementExists(this.handlers, event))
            		this.addEvent(event, fn, scope);    
            }
        },

        publish: function(event, data) {
            pubSub.handlers.forEach(function(fn) {
                if (fn.event === event) {
                    fn.handler.call(fn, data);
                }
            })
        },

        addEvent: function(event, fn, scope) {
            this.handlers.push({
                event: event,
                handler: fn.bind(scope)
            });
        },

        doesEventExist: function(element, event) {
        	return element.event === event;
        },

        checkIfElementExists: function(handlers, event) {
        	 	handlers.forEach(function(element, index) {
                    if (this.doesEventExist(element, event)) {
                        return true;
                    } else {
                    	return false;
                    }
                }, this);
        }


    };



    var chatController = {

        onKeyUpEvent: function(e) {
            if (chatController.isEnterKey(e)) {
                var message = factory.createMessageElement();
                pubSub.publish("addMessage", message);
                pubSub.publish("renderView", chatModel.getMessages());

            } else {
                pubSub.publish("setDataMessage", e.srcElement.value);
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
    _pubSub.subscribe("addMessage", _model.addMessage, _model);
    _pubSub.subscribe("renderView", _view.render, _view);
    _pubSub.subscribe("setDataMessage", _model.setDataMessage, _model);

    _view.init();

})();
