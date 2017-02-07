(function() {

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

    var calendarView = {
        dates: null,
        spinner: null,
        eventDisplay: null,
        popup: null,
        mask: null,

        init: function() {
            this.initElements();
            this.initListeners();
        },

        initElements: function() {
            this.dates = document.querySelector(".dates");

            this.spinner = document.createElement("div");
            this.spinner.className = "spinner";

            this.popup = document.querySelector(".popup");
            this.mask = document.querySelector(".mask");
        },

        initListeners: function() {
            this.dates.addEventListener("click", this.publishClick);
        },

        publishClick: function(e) {
            pubSub.publish("onDateClick", e);
        },

        appendSpinner: function(s) {
            s.appendChild(this.spinner);
        },

        displayEvents: function(events) {
            this.createEventDisplay();
            this.addEventsToPopup(events);
            this.displayPopup();
        },
        createEventDisplay: function() {
            this.eventDisplay = document.createElement("div");
            this.eventDisplay.className = "events";
        },
        addEventsToPopup: function(events){
            var self = this;

            events.forEach(function(e) {
                var d = document.createElement("div");
                d.className = "event";
                d.innerText = e.title;

                self.eventDisplay.appendChild(d);
            });
        },
        displayPopup: function() {
            var self = this;

            setTimeout(function() {
                self.spinner.classList.add("hidden");
                self.mask.classList.remove("hidden");
                self.popup.appendChild(self.eventDisplay);
                self.popup.classList.remove("hidden");
            }, 2000);
            
        }


    };

    var calendarController = {
        onDateClick: function(e) {
            var dateClicked = e.target.innerText;
            var events = this.getEventsForDate(dateClicked);

            pubSub.publish("appendSpinner", e.target);
            pubSub.publish("displayEvents", events);      
        },

        getEventsForDate: function(dateSelected) {
            return calendarModel.getEvents(dateSelected);
        }

    };

    var calendarModel = {
        events: [ {
            date: "1",
            title: "Test",
            description: "test deacription"
        }],
        eventObj : {
            date: null,
            title: "",
            description: ""
        },

        getEvents: function(date){
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

        yearMonth: { year: null, month: null },

        data: Array(42),
        init: function() {
            this.setYearMonth({
                year: 2017,
                month: 0
            });
            this.refreshData();
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
    var refresh = calendarModel.refreshData();
    datepicker.refreshDates(refresh);
    
    calendarView.init();
    pubSub.subscribe("onDateClick", calendarController.onDateClick, calendarController);
    pubSub.subscribe("appendSpinner", calendarView.appendSpinner, calendarView);
    pubSub.subscribe("getEventsForDate", calendarController.getEventsForDate, calendarController);
    pubSub.subscribe("displayEvents", calendarView.displayEvents, calendarView);

})();
