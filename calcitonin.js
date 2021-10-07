/**
 * Copyright  2021 Philip O. Martel 
 * released under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

const msPerDay = 24 * 60 *60 *1000;

// convert Date d to a string that can be loaded into an
// HTML form input element of type = 'date'
function dateToValue( d ) {
	var jDate = d.toJSON();
	var n = jDate.indexOf('T');
	jDate = jDate.slice(0, n);
	return jDate;
}


function setup() {
	//alert('in setup()');
	//check if local storage exists, if so load it
	var l_sDate, l_sLeft, l_sRight, l_skips;
	var cDate;
	var sDateVal,dC, dS, sLeft, ts;
	var daysActive, aDays, oddDays, skipDays;

	l_sDate = localStorage.getItem('s_date');
	
	if(!l_sDate ) {
		alert('please enter starting date and nostril, then save');
	} else { // read local storage values into document
		document.getElementById('s_date').value = l_sDate;
		// s_left and s_right items are strings, not booleans
		l_sLeft = localStorage.getItem('s_left');
		document.getElementById('s_left').checked = (l_sLeft == 'true');
		l_sRight = localStorage.getItem('s_right');
		document.getElementById('s_right').checked = (l_sRight == 'true');
		l_skips = localStorage.getItem('skips');
	}
	//load current date to document
	cDate = document.getElementById('c_date');
	dC = new Date();
	dC = midnight(dC);
	cDate.value = dateToValue(dC);
	
	// if startup info is present, calculate nostril, days since start doses 
	sDateVal = document.getElementById('s_date').value;
	if (sDateVal != "") {
		ts = sDateVal.split('-');
		dS = new Date( parseInt(ts[0]), parseInt(ts[1])-1, parseInt(ts[2]));
		dS = midnight(dS);
		daysActive = (dC - dS)/msPerDay;
		daysActive -= parseInt(l_skips);
		aDays = document.getElementById( 'a_days');
		aDays.innerHTML = daysActive + ' doses since start';
		sLeft = document.getElementById('s_left').checked;
		document.getElementById("skips").value = l_skips;
	

		oddDays = daysActive & 1;
		if ( oddDays ^ sLeft ) {
			document.getElementById('c_left').checked = true;
			document.getElementById('c_right').checked = false;
		} else {
			document.getElementById('c_left').checked = false;
			document.getElementById('c_right').checked = true;
		}
	}
}

function saveCurData(){
	var skips = document.getElementById('skips');
	
	if ( document.getElementById("c_skip").checked ) {
		skips.value = Number(skips.value) +1;
	}
	localStorage.setItem('skips',skips.value);
	alert( "Current date recorded" );

}
function saveInitialData() {
	//alert('in saveData()');
	var saveOk = true;
	var cook = document.cookie;
	var d = document.getElementById('s_date').value;
	var l = document.getElementById('s_left').checked;
	var r = document.getElementById('s_right').checked;
	var saveMsg = '';
	
	if (d == '') {
		saveMsg +=' start date not set';
		saveOk = false;
	}
	if ( !( l || r) ) {
		saveMsg += " Left or right nostril not selected";
		saveOk = false;
	}
	if ( saveOk ) {
		localStorage.setItem('s_date', d);
		localStorage.setItem('s_left', l);
		localStorage.setItem('s_right', r);	
		localStorage.setItem('skips', 0);
		alert( "Data saved" );
	} else {
		alert( 'Data not saved: ' + saveMsg );
	}
}

function showDate() {
	var cDate= document.getElementById('c_date');
}

// Takes a string yyyy-mm-dd and returns midnight on that date
function ymdToDate(ymd) {
	strArray = ymd.split('-');
	d = new Date( strArr[0],strArr[1],strArr[2],0,0,0,0);
}

function midnight(d) {
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return d;
}
