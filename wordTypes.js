var words = {
    adjectives: [],
    nouns: [],
    verbs: [],
    adverbs: []
};

class Word {
    constructor(args) {
        this.base = args.base;
    }
}

class Noun {
    constructor(args) {
        this.base = args.base;
        this.countable = args.countable === undefined ? true : args.countable;
        this.proper = args.proper || false;
        if (args.plural) {
            Object.defineProperty(this, 'plural', { value: args.plural });
        }
        this.gender = args.gender || 0;
        words.nouns.push(this);
    }
    get plural() {
        return this.base + 's';
    }
}

class Verb {
    constructor(args) {
        this.base = args.base;
        if (args.thirdPres) {
            this.thirdPres = args.thirdPres;
        }
        if (args.pastTense) {
            this.pastTense = args.pastTense;
        }
        if (args.pastPart) {
            this.pastPart = args.pastPart
        }

        this.acceptsObj = args.acceptsObj || false;
        this.needsObj = args.needsObj || false;

        words.verbs.push(this);
    }
    get thirdPres() {
        return this.base + 's';
    }
    get pastTense() {
        return this.base + 'ed'
    }
    get pastPart() {
        return this.pastTense;
    }
}

class Adverb extends Word {
    constructor(args) {
        super(args);
        words.adverbs.push(this);
    }
}