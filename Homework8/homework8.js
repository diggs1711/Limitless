(function() {

    var chatController = {

        onKeyUpEvent: function(e) {
 
            if (chatController.isEnterKey(e)) {

                var message = factory.createMessageElement();
                chatModel.addMessage(message);

                chatView.render(chatModel.messages);

            } else {
                chatModel.setDataMessage(this.value);
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
            this.inputEle.addEventListener("keyup", chatController.onKeyUpEvent);
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
