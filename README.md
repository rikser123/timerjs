Pure javascript plugin that allows to create countdown timers.

## 1.Features:
* simple installation
* small size
* don't require jquery or any other javascript libraries
* opportunity to set the start date in simple format
* opportunity to set any duration of count timer
* opportunity to set your own css classes for timer numbers and timer labels
* timer save the current time after page reloading
* opportunity to show/hide labels

## 2.Getting started:

include timer.js or timer.min.js at the end of your document before `<body/> `closing tag

`<script src='timer.js'></script>`

## 3. Set up your HTML

 You don't need any special markup. All you need is to wrap your divs inside the container element

`<div class="timer"></div>`

## 4. Call the plugin
```
new Timer({
    elems: document.querySelectorAll('.timer'), //one or more elements to create timers
	startDate: '2016-06-04 00:00',  //start date of timer in yyyy-mm-dd hh:mm format
	daysAmount: 7,  // number of days from start to finish the timer interval
	showLabels: true, //show or hide days, seconds, hours and minutes labels
	daysClass: 'days', //name of days number class
	hoursClass: 'hours', //name of hours number class
	minutesClass: 'minutes', //name of minutes number class
	secondsClass: 'seconds',
	labelClass: 'label'
});
```
