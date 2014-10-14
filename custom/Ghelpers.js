// GLOBAL HELPERS

String.prototype.initCap = function () {
    return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
        return m.toUpperCase();
    });
};

var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};


var wordTemplate = function (text, tag) {

    if (!tag) {
        throw new Error('Tag may not be null');
    }

    if (!text) {
        throw new Error('Text may not be null');
    }


    var innerTemplate =
        '<span class="word-ph" contenteditable="false">' +
            '<span class="word-nt">' + text + '</span>' +
            '<span class="word-ht" >' + tag + '</span>' +
        '</span>';

    var uid = ID();

    var outerOpen = '<word tag="' + tag + '" text="' + text + '" uid="' + uid + '" contenteditable="false">';
    var outerClose = '</word>';
    return outerOpen + innerTemplate + outerClose + ' ';


};

var wordDisplayTemplate = function (tag, text) {
    var template =
        '<span class="word-ph" >' +
            '<span class="word-nt">' + text + '</span>' +
            '<span class="word-ht" >' + tag + '</span>' +
        '</span>';

    return template;
}

var Word = function (tag,text,uid) {
    this.tag = tag;
    this.text = text;
    this.uid = uid;
}

String.prototype.startsWithVowel = function () {
    
    var chr = this.substring(0, 1).toUpperCase();
         
    return chr == 'A' |
           chr == 'E' |
           chr == 'I' |
           chr == 'O' |
           chr == 'U';
};
    