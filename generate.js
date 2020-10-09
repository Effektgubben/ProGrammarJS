new Noun({ base: 'apa' });
new Noun({ base: 'idiot' });
new Noun({ base: 'star' });
new Noun({ base: 'Donald Trump', proper: true });
new Noun({ base: 'index', plural: 'indices'});

new Verb({ base: 'drown', acceptsObj: true });
new Verb({ base: 'fall' });
new Verb({base:'analyze'})

new Adverb({ base: 'typically' });
new Adverb({ base: 'stupidly' });
new Adverb({ base: 'unnecessarily' });


var patterns = [
    [Subject, Predicate],
    [Subject, Predicate, Adverbial, null],
    
]

function generate() {
    var plural = randBool();
    var clauses = [new [Subject, Adverbial].random(plural)];
    var pattern;
    var stop = false
    while (!stop) {
        pattern = clauses.last.patterns.random;
        for (var Clause of pattern) {
            if (Clause) {
                clauses.push(new Clause(plural));
            }
            else {
                stop = true;
            }
        }
    }

    var str = '';
    for (var clause of clauses) {
        str += clause.generate(words) + ' ';
    }
    document.getElementById('result').innerHTML = str;
}




