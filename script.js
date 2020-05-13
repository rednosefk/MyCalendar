
const monthFormatChange = (month) => {
        let monthString = month.toString();
        if (month < 10) {
          monthString = "0" + monthString;
        }
        return monthString;
      };

$(document).ready(() => {
	var yearSelect = $("#yearSelect");
	for (var year = 1901; year < 2100; year++) {
		yearSelect.append("<option value=" + year + ">" + year + "</option>");
	}

	var monthSelect = $("#monthSelect");
	var date = moment("1901/01/01");

	for (var month = 1; month < 13; month++) {

		monthSelect.append(
            "<option value=" +
              monthFormatChange(month) +
              ">" +
              date.format("MMMM") +
              "</option>"
            );

			date = date.add(1, "month");
	}

	yearSelect.val(moment().year());
	monthSelect.val(monthFormatChange(moment().month() + 1));
});

const changeCalendar = () => {

	$("#days-cont").empty();

	var year = $("#yearSelect").val();
	var month = $("#monthSelect").val();
	let beginMonth = moment(year + "-" + month + "-01T00:00:00.000Z");

	let daysInMonth = beginMonth.daysInMonth();
	console.log (daysInMonth);

	var firstDay = beginMonth.weekday();
	if (firstDay === 0) {
		firstDay = 7;
	}
	let weekRow = $('<div class="days"><div class="dayNum" id="day1"></div><div class="dayNum" id="day2"></div><div class="dayNum" id="day3"></div><div class="dayNum" id="day4"></div><div class="dayNum" id="day5"></div><div class="dayNum" id="day6"></div><div class="dayNum" id="day7"></div></div>');

	var day = firstDay;
	var cloneWeekRow = $(weekRow[0]).clone();

	for (var j = 1; j <= daysInMonth; j++) {
		var dayId = "#day" + day;
		var daysDiv = $(dayId, cloneWeekRow);
		daysDiv[0].innerText = j;

		if (day === 7 || j === daysInMonth) {
			$("#days-cont").append(cloneWeekRow);
			day = 0;
			cloneWeekRow = $(weekRow[0]).clone();
		}
		day++;
	}
};