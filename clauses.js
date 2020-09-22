class Clause {
    constructor(generate) {
        this.generate = generate || this.generate;
        this.content = '';
    }
}



class Subject extends Clause {
    constructor(plural = randBool(), generate) {
        super(generate);
        this.plural = plural;
        this.definite = randBool();
    }
    generate(list) {
        var noun = list.nouns.random;
        this.content = noun.base;
        if (this.plural) {
            this.content = noun.plural;
        }
        return this.content;
    }
    
}


class Predicate extends Clause {
    constructor(plural = randBool(), generate) {
        super(generate);
        this.plural = plural;
    }
    generate(list) {
        var verb = list.verbs.random;
        this.content = verb.base;
        if (!this.plural) {
            this.content = verb.thirdPres;
        }
        return this.content;
    }
}

class Adverbial extends Clause {
    constructor(plural, generate) {
        super(generate);
    }
    generate(list) {
        var adverb = list.adverbs.random;
        return this.content = adverb.base;
    }
}



Subject.prototype.patterns = [
    [Predicate],
    [Predicate, Adverbial, null]
];
Predicate.prototype.patterns = [
    [Adverbial, null],
    [null]
];
Adverbial.prototype.patterns = [
    [Subject]
];