Object.defineProperties(Array.prototype, {
    last: {
        enumerable: false,
        configurable: true,
        get() {
            return this[this.length - 1];
        },
        set(el) {
            this[this.length - 1] = el;
        }
    },
    random: {
        enumerable: false,
        configurable: true,
        get() {
            return this[Math.floor(Math.random() * this.length)];
        }
    }
});



function randBool(bias = 0.5){
    return Math.random() < bias;
}