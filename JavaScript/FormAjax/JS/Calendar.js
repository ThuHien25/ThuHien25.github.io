	var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var numberDayOfMonth = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31");
	var dayName = new Array("Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat");
	var dateNow = new Date();
	var dateCheck = new Date().getDate();
	var monthCheck = new Date().getMonth();
	var yearCheck = new Date().getFullYear();
	var positionDayOne = 0;
	var results = "";
	var positionDateNow;
	//---Create----------------------------------------------------------------
	function main() 
	{
		document.write("<div id = 'calendar' style ='display:none;'>");
		document.write("<form>");
		document.write("<table id = 'calendar-table' style ='text-align: center;'>");
		this.drawRowAction();
		this.createRowNameDay();
		this.createCalendarDay(dateNow.getMonth(), dateNow.getFullYear());
		document.write("</table>");	
		document.write("</form>");	
		document.write("</div>");
	}
	/*Create: button previous year, button next year, button previous month, button next month, combobox month and year*/
	function drawRowAction() 
	{
		document.write("<tr>");
		document.write("<td class = 'btn' onclick = 'btnPreviousYearClick();'><a type = 'a' name = 'btnPreviousYear'>&#8647;</a></td>");
		document.write("<td class = 'btn' onclick = 'btnPreviousMonthClick();'><a type = 'a' name = 'btnPreviousMonth'>&#8592;</a></td>");
		document.write("<td class = 'btn' colspan = '2'><select id = 'months' onchange = 'changeMonth();'>");
			this.createMonths();
		document.write("</select></td>")
		document.write("<td class = 'btn'><select id = 'years' onchange = 'changeYear();'>");
			this.createYears();
		document.write("</select></td>")
		document.write("<td class = 'btn' onclick = 'btnNextMonthClick();'><a type = 'a' name = 'btnNextMonth'>&#8594;</a></td>");
		document.write("<td class = 'btn' onclick = 'btnNextYearClick();'><a type = 'a' name = 'btnNextYear'>&#8649;</a></td>");
		document.write("</tr>");
		document.write("<tr id = 'title'></tr>");
	}
	/*Create data in combobox Years*/
	function createYears() 
	{
		var x = document.getElementById("years");
		for (var i = 1990; i <= 2050; i++) 
		{
			var option = document.createElement("option");
			option.text = option.value = i;
			x.add(option);
		}
	}
	/*Create data in combobox Months*/
	function createMonths() 
	{
		var x = document.getElementById("months");
		for (var i = 0; i < months.length; i++) 
		{
			var option = document.createElement("option");
			option.text = months[i];
			option.value = i;
			x.add(option);
		}
	}
	function createRowNameDay()
	{
		var row = document.getElementById("title");
		for (var i = 0; i < dayName.length; i++) 
		{
			var cell = row.insertCell(i);
			cell.innerHTML = dayName[i];
		}
	}
	function createCalendarDay(month, year)
	{
		var count = 1;
		var indexRow = 2;
		var table = document.getElementById("calendar-table");
		for (var i = 0; i < 6; i++) 
		{
			var dayRows = table.insertRow(indexRow);
			dayRows.setAttribute("onclick", "cancelCalendar();");
			for (var j = 0; j < 7; j++)
			{
				var dayCells = dayRows.insertCell(j);
				dayCells.setAttribute("id", "day" + count);
				dayCells.setAttribute("class", "days");
				dayCells.setAttribute("onClick", "checkDay(" + count+");");
				dayCells.innerHTML = count;
				count++;
			}
			indexRow++;
		}
		btnClick();
	}
	//-------------------------------------------------------------------
	function btnClick()
	{
		setDate();
		setMonth();
		setYear();
	}
	/*Clear all day calendar*/
	function clear()
	{
		for (var i = 1; i <= 42; i++) {
			document.getElementById("day" + i).innerHTML = "";
			document.getElementById("day" + i).style.background = "none";
		}
	}
	function setMonth() {
		document.getElementById("months").value = monthCheck;
	}
	function setYear() {
		document.getElementById("years").value = yearCheck;
	}
	/*Set date for calendar*/
	function setDate()
	{
		var dateNow = new Date().getDate();
		var monthNow = new Date().getMonth();
		var yearNow = new Date().getFullYear();
		var prev_month = monthCheck - 1;
		var next_month = monthCheck + 1;
		
		if (((yearCheck % 4 == 0) && (yearCheck % 100 != 0)) || (yearCheck % 400 == 0))
			numberDayOfMonth[1] = 29;
		else
			numberDayOfMonth[1] = 28;
		
		if (prev_month < 0)
			prev_month = 11;
		if (next_month == 12)
			next_month = 0;
		
		var dayIndex = new Date(yearCheck, monthCheck, 1).getDay(); //Name day of week
		positionDayOne = parseInt(dayIndex);
		var numberDay = numberDayOfMonth[monthCheck];
		var numberDayOfPreviousMonth = numberDayOfMonth[prev_month];
		var numberDayOfNextMonth = numberDayOfMonth[next_month];
		
		var position = 1;
		var count = 1;
		var check = false;
		var positionStart = dayIndex;
		var positionStop = (parseInt(numberDay) + parseInt(dayIndex));
		
		for (var i = 0; i < 6; i++)
		{
			for (var j = 0; j < 7; j++)
			{
				if (count >= dayIndex)
					check = true;
				if (check == true && position <= numberDay)
				{
					document.getElementById("day" + (position + dayIndex)).innerHTML = position;
					document.getElementById("day" + (position + dayIndex)).style.background = "#FBFCFC";	
					if(dateNow == position && monthNow == monthCheck && yearNow == yearCheck)
					{
						document.getElementById("day" + (position + dayIndex)).style.background = "#00ACE6";	
						positionDateNow = "day" +(position + dayIndex);
					}
					document.getElementById("day" + (position + dayIndex)).style.color = "#000";
					position++;	
				}
				count++;
			}
		}
		for (var i = positionStart; i > 0; i--) 
		{
			document.getElementById("day" + (i)).innerHTML = numberDayOfPreviousMonth--;
			document.getElementById("day" + (i)).style.color = "#ffffff";
		}
		for (var j = 1; j <= (42 - positionStop); j++)
		{
			document.getElementById("day" + (j + positionStop)).innerHTML = j;
			document.getElementById("day" + (j + positionStop)).style.color = "#ffffff";
		}
	}
	function changeMonth()
	{
		clear();
		monthCheck = parseInt(document.getElementById("months").value);
		console.log("Month Check: " + monthCheck);
		setDate();
	}
	function changeYear()
	{
		clear();
		yearCheck = parseInt(document.getElementById("years").value);
		console.log("Year Check: " + yearCheck);
		setDate();
	}
	//-------------------------------------------------------------------
	function openCalendar()
	{
		document.getElementById("calendar").style.display = "block";
		changeMonth();
	}
	function cancelCalendar()
	{
		document.getElementById("calendar").style.display = "none";
	}
	/*Create event for button previous month*/
	function btnPreviousMonthClick()
	{
		clear();
		monthCheck = monthCheck - 1;
		if (monthCheck < 0) {
			monthCheck = 11;
			yearCheck = yearCheck - 1;
		}
		console.log("Month Check: " + monthCheck);
		btnClick();
	}
	/*Create event for button next month*/
	function btnNextMonthClick()
	{
		clear();
		monthCheck = parseInt(monthCheck) + 1;
		if (monthCheck > 11) {
			monthCheck = 0;
			yearCheck = yearCheck + 1;
		}
		console.log("Month Check: " + monthCheck);
		btnClick();
	}
	/*Create event for button previous year*/
	function btnPreviousYearClick()
	{
		clear();
		yearCheck = yearCheck - 1;
		console.log("YearCheck: " + yearCheck);
		btnClick();
	}
	/*Create event for button next year*/
	function btnNextYearClick()
	{
		clear();
		yearCheck = yearCheck + 1;
		console.log("YearCheck: " + yearCheck);
		btnClick();
	}
	/*Click on the calendar view the selected day*/
	function checkDay(position)
	{
		var previous_month = monthCheck;
		var now_month = parseInt(monthCheck) + 1;
		var next_month = parseInt(monthCheck) + 2;
		var year = yearCheck;
		var day = document.getElementById("day" + position).innerHTML;
		
		if (previous_month == 0)
			previous_month = 12;
		if (next_month == 13)
			next_month = 1;
		if (parseInt(day) > position) 
		{
			if (previous_month == 12)
				year--;
			var results = day + "/" + previous_month + "/" + year;
		}
		else if (parseInt(day) < (position - positionDayOne)) 
		{
			if (next_month == 1)
				year++;
			var results = day + "/" + next_month + "/" + year;
		}
		else {
			var results = day + "/" + now_month + "/" + year;
		}
		document.getElementById("date").value = results;
	}	
	function setDateNowForInput() 
	{
		results = dateCheck + "/" + (monthCheck + 1) + "/" + yearCheck;
		document.getElementById("date").value = results;
	}