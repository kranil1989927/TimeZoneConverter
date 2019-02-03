$(document).ready(function(){

  $('#calTime').click(function(){
	  
	  var feb = '13-Feb-2019 00:12';
	  var sep = '13-Jul-2019 00:12';
	  var zone = $("#zones option:selected").val();
	  
	  var inputFormat = 'DD-MMM-YYYY HH:mm';
	  var outputFormat = 'DD-MMM-YYYY HH:mm z';
	  
	  var formttedTimeFeb = moment.utc(feb, inputFormat).tz(zone).format(outputFormat);
	  $("#febTime").html(formttedTimeFeb);
	  
	  var formttedTimeSep = moment.utc(sep, inputFormat).tz(zone).format(outputFormat);
	  $("#sepTime").html(formttedTimeSep);
	  
	  // Working fine
	  
	  var dateTimeArr = [formttedTimeFeb, formttedTimeSep, "21-Jun-2019 BST", "11:43 BST"];
	  for(var i = 0; i < dateTimeArr.length; i++){
		var dateStr = dateTimeArr[i];
		var pattern = /\d{2}-[A-Za-z]{3}-\d{4}\s\d{2}:\d{2}\s[A-Z]{3}$/i;
		if(pattern.test(dateStr)){
			var date = getTimeZoneOffset(dateStr, zone);
			$("#dbDate"+i).html(date);
		}
		else {
			console.log(dateStr + " - Failed");
			$("#dbDate"+i).html(dateStr);
		}
	  }
	  
  }); 
  
  function getTimeZoneOffset(dateTimeZone, zone){
	  var outputFormat = 'DD-MMM-YYYY HH:mm z';
	  var fmtDateTime = moment(dateTimeZone, outputFormat).utc().format(outputFormat);
	  var offset = moment(fmtDateTime).tz(zone).format('Z');
	  return getDate(dateTimeZone, offset);
  }
  
  function getDate(inputDate, offset){
	  var test = inputDate.split(' ');
	  var myDate = new Date(test[0] + " " + test[1]);
	  
	  var ofs = +offset.split(":")[0];
	  myDate.setHours(myDate.getHours() - ofs);
	  return moment(myDate).format('DD-MMM-YYYY HH:mm');
  }
  
});