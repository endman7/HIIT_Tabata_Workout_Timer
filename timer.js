var uploadComp = new Vue({
    el: '#app',
    data: {
        label: null,
        displaySec: 0,

        prepSec2: 20,
        workoutSec2: 20,
        restSec2: 20,
        cycles2: 8,
        tabatas2: 4,

        prepSec: 0,
        workoutSec: 0,
        restSec: 0,
        cycles: 0,
        tabatas: 0,

        isRunning: false,
        prepTimer: null,
        workoutTimer: null,
        restTimer: null,
        interval: 1000,
    },
    computed: {},
    methods: {
        playSound() {
            var audio = new Audio('https://cdn.pixabay.com/download/audio/2022/01/18/audio_a29a673ef4.mp3?filename=decidemp3-14575.mp3');
            audio.play();
        },
        pad(n) {
            return (n < 10) ? ("0" + n) : n;
        },
        runTimer() {
            this.isRunning = true;
            if (this.workoutSec > 0 || this.restSec > 0) {

                this.workoutTimer = setInterval(() => {
                    //Check for exit condition
                    if (this.workoutSec <= 0 && this.restSec <= 0) {
                        clearInterval(this.workoutTimer);
                        this.isRunning = false;
                        console.log('one cycle done' + new Date());
                        //repeat cycles
                        if (this.cycles > 1) {
                            this.cycles--;
                            this.prepSec = this.prepSec2;
                            this.workoutSec = this.workoutSec2;
                            this.restSec = this.restSec2;
                            //Sarts over
                            this.runTimer();
                        } else {
                            if (this.tabatas > 1) {
                                //repeat tabata
                                this.tabatas--;
                                this.cycles = this.cycles2;
                                this.prepSec = this.prepSec2;
                                this.workoutSec = this.workoutSec2;
                                this.restSec = this.restSec2;
                                //Sarts over
                                this.runTimer();
                            } else {
                                clearInterval(this.workoutTimer);
                                this.displaySec = 0;
                                this.cycles = 0;
                                this.tabatas = 0;
                                console.log('all cycles done');
                                this.label = "done";
                            }
                        }
                    }

                    //Decrement and status
                    if (this.cycles === this.cycles2 && this.prepSec >= 1) {
                        this.displaySec = this.prepSec;
                        this.prepSec--;
                        this.label = "prep";
                        return;
                    } else if (this.workoutSec >= 1) {
                        this.displaySec = this.workoutSec;
                        this.workoutSec--;
                        this.label = "workout";
                        if (this.workoutSec < 5)
                            this.playSound();
                        return;
                    } else if (this.restSec >= 1) {
                        this.displaySec = this.restSec;
                        this.restSec--;
                        this.label = "rest";
                        if (this.restSec < 5)
                            this.playSound();
                        return;
                    }
                }, this.interval);
            }
        },

        playClick() {
            //Start the timer
            this.runTimer();
            this.playSound();
        },
        pauseClick() {
            clearInterval(this.workoutTimer);
            this.isRunning = false;
            this.playSound();
        },
        resetClick() {
            clearInterval(this.workoutTimer);
            this.isRunning = false;
            this.label = null;
            this.displaySec = 0;
            this.prepSec = this.prepSec2;
            this.workoutSec = this.workoutSec2;
            this.restSec = this.restSec2;
            this.cycles = this.cycles2;
            this.tabatas = this.tabatas2;
        }

    },
    created: function () {

    },
    mounted: function () {
        this.resetClick();
    }
})