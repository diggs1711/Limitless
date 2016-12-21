(function() {
    'use strict';

    var datePicker,
        month,
        tableRow,
        months,
        daysOfWeek,
        header,
        dayCount,
        previousButton,
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

        daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        date = new currentDate();

        header = document.createElement('div');
        header.className = "header";
        header.innerHTML = date.monthName + " " + date.currentYear;

        dayCount = 1;
    }

    function currentDate() {
        var today = new Date();
        var mm = today.getMonth(); //January is 0!

        this.monthName = Object.keys(months)[mm];
        this.month = mm;
        this.currentYear = today.getFullYear();
        this.day = today.getDate();
        this.dayName = today.getDay();
    }

    function getFirstDayOfTheMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    function createDayNameHeader() {
        daysOfWeek.forEach(function(day) {
            var el = document.createElement('td');
            el.innerHTML = day;
            el.className = "dayName";
            tableRow.appendChild(el);
        });

        month.appendChild(tableRow);
    }

    function createTablesRows() {
        for (var i = 0; i < 5; i++) {
            var week = document.createElement('tr');
            week.className = "week";
            var firstDayOfMonth = getFirstDayOfTheMonth(date.currentYear, date.month)
            for (var j = 1; j < 8; j++) {
                if (j > firstDayOfMonth || i > 0) {
                    var el = document.createElement('td');
                    el.innerHTML = dayCount;
                    el.className = "dayNumber";

                    week.appendChild(el);
                    dayCount = (isLastDayOfMonth(dayCount, date)) ? 1 : (dayCount + 1);
                } else {
                    var previous = document.createElement('td');
                    var previousMonth = Object.keys(months)[date.month - 1];
                    previous.innerHTML = months[previousMonth] - firstDayOfMonth + j;
                    previous.className = "dayNumber";
                    week.append(previous);
                }
            }
            month.appendChild(week);
        }
    }

    function addElementsToPage() {
        datePicker.appendChild(header);
        datePicker.appendChild(month);
        document.body.appendChild(datePicker);
    }

    function renderCalendar() {
        createDayNameHeader();
        createTablesRows();
        addElementsToPage();
    }

    function isLastDayOfMonth(day, date) {
        return dayCount === Number(months[date.monthName]);
    }
    start();
})();
