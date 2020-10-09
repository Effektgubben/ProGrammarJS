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

Object.prototype.setProp = function (key, val, configurable = true, enumerable = true, writable = true) {
    Object.defineProperty(this, key, { value: val, configurable: configurable, enumerable: enumerable, writable: writable });
};
Object.prototype.setProp.value = ''; //Vue needs this for some reason

function randBool(bias = 0.5){
    return Math.random() < bias;
}