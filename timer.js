( function( window ) {



    function Timer(options) {

        function extend( a, b ) {
            for( var key in b ) {
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        this.options = extend( {}, this.options );
        extend( this.options, options );



        this._renderDate();
        this._slideTimer();


    }


    Timer.prototype.options = {
        elems: document.querySelectorAll('.timer'),
        startDate: '2016-06-04 00:00',
        daysAmount: '7',
        showLabels: true,
        daysClass: 'days',
        hoursClass: 'hours',
        minutesClass: 'minutes',
        secondsClass: 'seconds',
        labelClass: 'label'
    };


    Timer.prototype._renderDate = function() {

        var self = this;

        var startDate = new Date(this.options.startDate);
        startDate.setDate(startDate.getDate() + parseInt(this.options.daysAmount));


        var now = Date.now();
        var dateMilliseconds = startDate - now;

        if (dateMilliseconds < 0) {
            while(dateMilliseconds < 0) {

                startDate.setDate(startDate.getDate() + parseInt(this.options.daysAmount));
                dateMilliseconds = startDate - now;

            }
        }

        var time = dateMilliseconds;



        [].forEach.call(this.options.elems, function(item){
            if (item.innerHTML === '') {

                item.innerHTML = '<div class="number-item"><div class="'+self.options.daysClass+'"></div></div>' +
                '<div class="number-item"><div class="'+self.options.hoursClass+'"></div></div>' +
                '<div class="number-item"><div class="'+self.options.minutesClass+'"></div></div>' +
                '<div class="number-item"><div class="'+self.options.secondsClass+'"></div></div>';
                if (self.options.showLabels) {
                    item.innerHTML = '<div class="number-item"><div class="'+self.options.daysClass+'"></div><div class="'+self.options.labelClass+' days-label"></div></div>' +
                    '<div class="number-item"><div class="'+self.options.hoursClass+'"></div><div class="'+self.options.labelClass+' hours-label"></div></div>' +
                    '<div class="number-item"><div class="'+self.options.minutesClass+'"></div><div class="'+self.options.labelClass+' minutes-label"></div></div>' +
                    '<div class="number-item"><div class="'+self.options.secondsClass+'"></div><div class="'+self.options.labelClass+' seconds-label"></div></div>';
                }

            }
        });

        var timeSeconds = time / 1000;



        var days = Math.floor(timeSeconds / 86400);
        timeSeconds -= days * 86400;
        var hours = Math.floor(timeSeconds / 3600);
        timeSeconds -= hours * 3600;
        var minutes = Math.floor(timeSeconds / 60);
        timeSeconds -= minutes * 60;
        var seconds = Math.floor(timeSeconds);

        [].forEach.call(this.options.elems, function(item){
            item.querySelector('.days').innerHTML = days;
            item.querySelector('.hours').innerHTML = hours;
            item.querySelector('.minutes').innerHTML = minutes;
            item.querySelector('.seconds').innerHTML = seconds;

            if (days < 10) {
                item.querySelector('.days').innerHTML = '0' + days;
            }

            if (hours < 10) {
                item.querySelector('.hours').innerHTML = '0' + hours;
            }

            if (minutes < 10) {
                item.querySelector('.minutes').innerHTML = '0' + minutes;
            }

            if (seconds < 10) {
                item.querySelector('.seconds').innerHTML = '0' + seconds;
            }

            if (self.options.showLabels) {
                var daysNumber = parseInt(item.querySelector('.days').innerHTML);
                item.querySelector('.days-label').innerHTML = self.semantic(daysNumber,['день','дня','дней']);

                var hoursNumber = parseInt(item.querySelector('.hours').innerHTML);
                item.querySelector('.hours-label').innerHTML = self.semantic(hoursNumber, ['час', 'часа', 'часов']);

                var minutesNumber = parseInt(item.querySelector('.minutes').innerHTML);
                item.querySelector('.minutes-label').innerHTML = self.semantic(minutesNumber, ['минута','минуты','минут']);

                var secondsNumber = parseInt(item.querySelector('.seconds').innerHTML);
                item.querySelector('.seconds-label').innerHTML = self.semantic(secondsNumber,['секунда','секунды','секунд'])

            }
        })

    };

    Timer.prototype._slideTimer = function() {

        var self = this;

        [].forEach.call(this.options.elems, function(item){
            var days = parseInt(item.querySelector('.days').innerHTML);
            var hours = parseInt(item.querySelector('.hours').innerHTML);
            var minutes = parseInt(item.querySelector('.minutes').innerHTML);
            var seconds = parseInt(item.querySelector('.seconds').innerHTML);

            var interval = setInterval(function(){
                seconds--;

                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }

                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                }

                if (hours < 0) {
                    hours = 23;
                    days--;
                }

                if (days = 0) {
                    days = 0;
                }

                self._renderDate();
            },1000)
        })

    };



    Timer.prototype.semantic = function(number, forms) {
        number = parseInt(number);
        if (number > 100)
            number = number % 100;
        if (number == 0)
            return forms[2];
        if (number > 4 && number < 21)
            return forms[2];
        var mod = number % 10;
        if (mod == 0)
            return forms[2];
        if (mod == 1)
            return forms[0];
        return mod > 4 ? forms[2] : forms[1];
    };

    window.Timer = Timer;

} )( window );