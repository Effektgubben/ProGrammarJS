var words = {
    adjectives: [],
    nouns: [],
    verbs: [],
    adverbs: []
};
db.nouns.toArray(function (nouns) {
    words.nouns = nouns;
});


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
        db.nouns.put({ base: args.base });
    }
    get plural() {
        return this.base + 's';
    }
}

class Verb {
    constructor(args) {
        this.base = args.base;
        if (args.thirdPres) {
            this.setProp('thirdPres', args.thirdPres);
        }
        if (args.pastTense) {
            this.setProp('pastTense', args.pastTense);
        }
        if (args.pastPart) {
            this.setProp('pastPart', args.pastPart);
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