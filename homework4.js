(function() {
    'use strict';

    var datePicker,
        month,
        tableRow,
        months,
        daysOfMonth,
        header,
        dayCount,
        date;

    function start() {
        init();
        renderCalendar();
    }

    function init() {
        datePicker = document.createElement('div');
        datePicker.className = "datepicker";

        month = document.createElement('table');
        month.className = "month";

        tableRow = document.createElement('tr');
        tableRow.className = "week";

        months = {
            January: "31",
            February: "28",
            March: "31",
            April: "30",
            May: "31",
            June: "30",
            July: "31",
            August: "31",
            September: "30",
            October: "31",
            November: "30",
            December: "31"
        };

        date = new currentDate();

        daysOfMonth = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        header = document.createElement('div');
        header.className = "header";
        header.innerHTML = date.currentMonth + " " + date.currentYear;

        dayCount = 1;
    }

    function currentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth(); //January is 0!
        var yyyy = today.getFullYear();

        this.currentMonth = Object.keys(months)[mm];
        this.currentYear = yyyy;
        this.day = dd;
    }

    function renderCalendar() {

        daysOfMonth.forEach(function(day) {
            var el = document.createElement('td');
            el.innerHTML = day;
            el.className = "dayName";
            tableRow.appendChild(el);
        });

        month.appendChild(tableRow);

        for (var i = 0; i < 5; i++) {
            var week = document.createElement('tr');
            week.className = "week";

            for (var j = 1; j < 8; j++) {
                var el = document.createElement('td');
                el.innerHTML = dayCount;
                el.className = "dayNumber";
                week.appendChild(el);

                dayCount = (isLastDayOfMonth(dayCount, date)) ? 1 : (dayCount + 1);
            }
            month.appendChild(week);
        }

        datePicker.appendChild(header);
        datePicker.appendChild(month);
        document.body.appendChild(datePicker);
    }

    function isLastDayOfMonth(day, date) {
        return dayCount === Number(months[date.currentMonth]);
    }

    start();
})();
