(function() {
    'use strict';

    var datepicker = {
        ele: null,
        wrap: null,
        nav: null,
        month: null,
        dates: [],

        refreshDates: function(dataDates) {
            for (var i = 0; i < 42; i++) {
                this.dates[i].innerText = dataDates[i];
            }
        },

        init: function() {
            this.initEle();
            this.initMonth();
        },

        initEle: function() {
            this.ele = document.querySelector('.datepicker');
            this.wrap = document.createElement('div');
            this.wrap.className = "dates";
            this.ele.appendChild(this.wrap);
        },

        initMonth: function() {
            var date;
            var frag = document.createDocumentFragment();
            for (var i = 0; i < 42; i++) {
                date = document.createElement('div');
                date.className = "date";
                this.dates.push(date);
                frag.appendChild(date);
            }
            this.wrap.appendChild(frag);
        },
    };

    var pubSub = {
        handlers: [],

        subscribe: function(event, fn, scope) {
            scope = scope || fn;

            if (!this.checkIfElementExists(this.handlers, event))
                this.addEvent(event, fn, scope);
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
            if (this.isArrayEmpty(handlers)) return false;

            handlers.forEach(function(element, index) {
                return this.doesEventExist(element, event) ? true : false;
            }, this);
        },
        isArrayEmpty: function(arr) {
            return this.handlers.length === 0;
        }


    };

    var mask = (function() {

        var Mask = {
            mainEle: null,
            maskEle: null,
            init: function() {
                this.initElements();
                this.initListeners();
            },

            initElements: function() {
                this.maskEle = document.querySelector(".mask");
            },

            initListeners: function() {
                var me = this;

                this.maskEle.addEventListener('click', me.clearMask);
            },

            clearMask: function(e) {
                pubSub.publish("onMaskClick", e);
            },

            show: function() {
                this.maskEle.classList.remove("hidden");
            },

            hide: function() {
                this.maskEle.classList.add("hidden");
            }
        };

        return Mask;
    })();

    var spinner = (function() {

        var Loading = {
            mainEle: null,
            loadingEle: null,
            init: function() {
                this.initElements();
            },

            initElements: function() {
                this.loadingEle = this.createSpinnerElement();
            },

            createSpinnerElement: function() {
                var s = document.createElement("div");
                s.className = "spinner"
                return s;
            },

            show: function() {
                this.loadingEle.classList.remove("hidden");
            },

            hide: function() {
                this.loadingEle.classList.add("hidden");
            }
        };

        return Loading;
    })();

    var popup = (function() {

        var popup = {
            popupEle: null,

            init: function() {
                this.initElements();
            },

            initElements: function() {
                this.popupEle = document.querySelector('.popup');
            },

            show: function() {
                this.popupEle.classList.remove('hidden');
            },

            hide: function() {
                this.popupEle.classList.add('hidden');
            }
        };

        return popup;

    })();

    var calendarView = {
        dates: null,
        spinner: spinner,
        eventDisplay: null,
        popup: popup,
        mask: mask,

        init: function() {
            this.initElements();
            this.initListeners();
        },

        initElements: function() {
            this.dates = document.querySelector(".dates");
            this.popup.init();
            this.mask.init();
            this.spinner.init();
        },

        initListeners: function() {
            this.dates.addEventListener("click", this.publishClick);
        },

        publishClick: function(e) {
            pubSub.publish("onDateClick", e);
        },

        appendSpinner: function(day) {
            this.spinner.show();
            day.appendChild(this.spinner.loadingEle);
        },

        displayEvents: function(events) {
            this.initEventDisplay();
            this.addEventsToPopup(events);
            this.displayPopup();
        },

        initEventDisplay: function() {
            this.eventDisplay = document.createElement("div");
            this.eventDisplay.className = "events";
        },

        createEventElement: function(title) {
            var d = document.createElement("div");
            d.className = "event";
            d.innerText = title;
            return d; 
        },

        addEventsToPopup: function(events) {
            var self = this;

            
            if (events.length === 0) {
                var d = self.createEventElement("No events for this date");
                self.eventDisplay.appendChild(d);
            } else {
                events.forEach(function(e) {
                    var d = self.createEventElement(e.title);
                    self.eventDisplay.appendChild(d);
                });
            }

        },
        displayPopup: function() {
            var self = this;

            setTimeout(function() {
                self.spinner.hide();
                self.popup.popupEle.appendChild(self.eventDisplay);
                self.popup.show();
                self.mask.show();

            }, 2000);

        },

        clearPopup: function() {
            this.eventDisplay.parentNode.removeChild(this.eventDisplay);
            this.popup.hide();
            this.mask.hide();
        }


    };

    var calendarController = {

        onDateClick: function(e) {
            var d = e.target;
            var dateClicked = d.innerText;
            var events = calendarModel.getEvents(dateClicked);

            pubSub.publish("appendSpinner", d);
            pubSub.publish("displayEvents", events);
        },

    };

    var calendarModel = {

        yearMonth: { year: null, month: null },
        data: Array(42),
        events: [{
            date: "1",
            title: "Test",
            description: "test deacription"
        }, {
            date: "2",
            title: "Test2",
            description: "test deacription"
        }, {
            date: "2",
            title: "Test3",
            description: "test deacription"
        }, ],
        eventObj: {
            date: null,
            title: "",
            description: ""
        },

        init: function() {
            this.setYearMonth({
                year: 2017,
                month: 0
            });
            this.refreshData();
        },

        getEvents: function(date) {
            return this.events.filter(this.matchDates.bind(this, date));
        },

        matchDates: function(d, e) {
            return e.date.trim() === d.trim();
        },

        createEvent: function(date, t, d) {
            var event = new eventObj();

            event.date = date;
            event.title = t;
            event.description = d;

            return event;
        },

        addEvent: function(e) {
            this.events.push(e);
        },

        refreshData: function() {
            var ym = this.getYearMonth(),
                y = ym.year,
                m = ym.month,
                offset = this.getOffset(y, m),
                numOfDays = this.getNumOfDaysInAMonth(y, m),
                c = 1;

            for (var i = 0, ln = this.data.length; i < ln; i++) {
                this.data[i] = (i >= offset && i < numOfDays + offset) ? c++ : null;
            }

            return this.data;
        },

        getYearMonth: function() {
            return this.yearMonth;
        },

        setYearMonth: function(yearMonth) {
            this.yearMonth = yearMonth;
            this.updateYearMonth();
        },

        updateYearMonth: function() {
            this.refreshData();
        },

        getNextMonth: function(year, month) {
            return {
                month: month === 11 ? 0 : month + 1,
                year: month === 11 ? year + 1 : year
            };
        },

        getPreMonth: function(year, month) {
            return {
                month: month === 0 ? 11 : month - 1,
                year: month === 0 ? year - 1 : year
            };
        },

        getOffset: function(year, month) {
            return ((new Date(year, month, 1)).getDay() + 6) % 7;
        },

        getNumOfDaysInAMonth: function(year, month) {
            return (new Date(year, month + 1, 0)).getDate();
        }
    };

    calendarModel.init();
    datepicker.init();
    datepicker.refreshDates(calendarModel.refreshData());
    calendarView.init();

    pubSub.subscribe("onDateClick", calendarController.onDateClick, calendarController);
    pubSub.subscribe("appendSpinner", calendarView.appendSpinner, calendarView);
    pubSub.subscribe("displayEvents", calendarView.displayEvents, calendarView);
    pubSub.subscribe("onMaskClick", calendarView.clearPopup, calendarView);

})();
