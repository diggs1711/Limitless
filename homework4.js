(function() {
    'use strict';

    var datePicker,
        table,
        tableRow,
        months,
        daysOfWeek,
        header,
        dayCount,
        enterButton,
        date,
        month,
        year;

    function start() {
        init();
        renderCalendar();
    }

    function init() {
        datePicker = document.createElement('div');
        datePicker.className = "datepicker";

        table = document.createElement('table');
        table.className = "month";

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

        dayCount = 1;

        enterButton = document.querySelector('.enterButton');
        enterButton.addEventListener("click", function(e) {
            reRenderCalendar();
        });
    }

    function createHeader() {
        header.innerHTML = date.monthName + " " + date.currentYear;
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
        table.appendChild(tableRow);
    }

    function createTablesRows() {
        for (var i = 0; i < 5; i++) {
            var week = document.createElement('tr');
            week.className = "week";

            var firstDayOfMonth = getFirstDayOfTheMonth(date.currentYear, date.month);

            for (var j = 1; j < 8; j++) {
                if (isDayTheFirstOfCurrentMonth(j, i, firstDayOfMonth)) {
                    var el = document.createElement('td');
                    el.innerHTML = dayCount;
                    el.className = "dayNumber";

                    week.appendChild(el);
                    dayCount = (isLastDayOfMonth(dayCount, date)) ? 1 : (dayCount + 1);
                } else {
                    var previousDays = fillDaysBeforeStartOfMonth(firstDayOfMonth, j);
                    week.append(previousDays);
                }
            }
            table.appendChild(week);
        }
    }

    function fillDaysBeforeStartOfMonth(firstDayOfMonth, j) {
        var previous = document.createElement('td');
        var previousMonth = Object.keys(months)[date.month - 1];

        previous.innerHTML = months[previousMonth] - firstDayOfMonth + j;
        previous.className = "dayNumber";

        return previous;
    }

    function isDayTheFirstOfCurrentMonth(j, i, firstDayOfMonth) {
        return (j > firstDayOfMonth || i > 0);
    }

    function addElementsToPage() {
        datePicker.appendChild(header);
        datePicker.appendChild(table);
        document.body.appendChild(datePicker);
    }

    function emptyContents() {
        dayCount = 1;

        datePicker.innerHTML = "";
        table.innerHTML = "";
        tableRow.innerHTML = "";
        header.innerHTML = "";
    }

    function renderCalendar() {
        createHeader();
        createDayNameHeader();
        createTablesRows();
        addElementsToPage();
    }

    function getInputValues() {
        date.currentYear = document.getElementsByName("year")[0].value;
        date.month = document.getElementsByName("month")[0].value - 1;
        date.monthName = Object.keys(months)[date.month];
    }

    function reRenderCalendar() {
        getInputValues();

        if (date.currentYear === 0 || date.month < 0) {
            alert("Please enter correct values");
        } else {
            emptyContents();
            createHeader();
            createDayNameHeader();
            createTablesRows();
            addElementsToPage();
        }
    }

    function isLastDayOfMonth(day, date) {
        return dayCount === Number(months[date.monthName]);
    }
    start();
})();
