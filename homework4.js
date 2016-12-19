var datePicker = document.createElement('div');
datePicker.className = "datepicker";


var month = document.createElement('table');
var months = {January : "31", February : "28",
March : "31", April : "30", May: "31", June: "30",
July:"31", August:"31", September: "30", October:"31",
November: "30",December: "31"};
this.currentMonth = "December";
this.currentYear = 2016;
this.day = 12;

var daysOfMonth = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var header = document.createElement('div');
header.className = "header";
header.innerHTML = this.currentMonth +" "+ this.currentYear;
datePicker.appendChild(header);

month.className = "month";

var week = document.createElement('tr');
week.className = "week";
daysOfMonth.forEach(function(day) {
  var el = document.createElement('td');
  el.innerHTML = day;
  week.appendChild(el);
})
month.appendChild(week);

var dayCount = 1;
for(var i=0; i<5; i++) {
  var week = document.createElement('tr');
  week.className = "week";
  for(var j=1;j<8;j++) {
    var el = document.createElement('td');
    el.innerHTML = dayCount;
    week.appendChild(el);

    if(dayCount === Number(months[this.currentMonth])){
      dayCount = 1;
    }else{
      dayCount++;
    }
  }
  month.appendChild(week);
}

datePicker.appendChild(month);
document.body.appendChild(datePicker);
