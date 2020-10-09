const inTypes = { text: 0, checkbox: 1, radio: 2 };

var formsVue = new Vue({
    el: '#wordForms',
    data: {
        wordClass: 'noun'
    },
    methods: {
        setActiveForm() {
            $('.wordForm').hide();
            $('#' + this.wordClass + 'Form').show();
        }
    }
});

var nounTemplate = [
    { key: 'base', label: 'Base', type: 'text', placeholder: 'lemur' },
    { key: 'plural', label: 'Plural', type: 'text', placeholder: 'lemurs' },
    { key: 'countable', label: 'Countable', type: 'checkbox', defVal: true },
    { key: 'proper', label: 'Proper name', type: 'checkbox' }
];
nounTemplate.wordClass = Noun; //Is this bad when iterating with for...of?
var verbTemplate = [
    { key: 'base', label: 'Base', type: 'text', placeholder: 'sing' },
    { key: 'thirdPres', label: 'Singular third person present', type: 'text', placeholder: "sings" },
    { key: 'past', label: 'Past tense', type: 'text', placeholder: 'Not implemented' },
    { key: 'trans', labels: ['Transitive', 'Intransitive', 'Ergative'], type: 'radio', defVal: 2 }
];
verbTemplate.wordClass = Verb;
var submitInd = 0;

function renderInputs(template, methods, parentEl, target = {}, submitLabel = 'Submit') {
    var str = '';
    var data = {};
    for (var field of template) {
        if (field.type === 'radio') {
            var i = 0;
            for (var label of field.labels) {
                str += '<label>' + label + '<input type="radio" class="w4" value="' + i + '" v-model="' + field.key + '" ></label>'
                i++;
            }
        }
        else {
            str += '<label>' + field.label + '<input type="' + field.type + (field.placeholder ? '" placeholder="' + field.placeholder : '') + '" class="w4" v-model="' + field.key + '" ></label > '
        }
        data[field.key] = field.defVal;
    }
    data.wordClass = template.wordClass;
    parentEl.insertAdjacentHTML('beforeend', str + '<button class="td1 ml-auto mr0 db mt2 b--black-30 hover-bg-black pv1 bg-dark-blue ph2 br1 white" v-on:click="add">Add</button>');

    return new Vue({
        el: '#' + parentEl.id,
        data: data,
        methods: methods
    });
}

function addWord() {
    try {
        var args = {};
        for (var key in this._data) {
            args[key] = this[key];
        }
        new this.wordClass(args);
        alert('Successfully added "' + this.base + '" as a new ' + this.wordClass.name.toLowerCase());
    }
    catch (e) {
        alert('Could not add your word because of this ' + e);
    }
}

function makeWordForm(template, className) {
    var id = className + 'Form';
    wordForms.insertAdjacentHTML('beforeend', '<div id="' + id + '" class="tr wordForm"></div');

    renderInputs(template, { add: addWord }, wordForms.lastChild);
    $('#' + id).hide();
    return wordForms.lastChild;
}
var forms = {
    noun: makeWordForm(nounTemplate, 'noun'),
    verb: makeWordForm(verbTemplate, 'verb')
};

formsVue.setActiveForm();