/* TODO: refactor
move these into somewhere else and/or other class out of the global namesapce
// can make into prototype obj eg
var _  = self.WordHelper = function(){}
_.prototype = {
  createEditorTemplate = function(text,tag){ ... },
  createDisplayTemplate = function(text,tag) { ... },
  createWordDataObj = fucntion(text,tag){ ... } // <- move uid gen logic into here?
}

*/

//Word JS Object   
var Word = function (tag, text, uid) {
    this.tag = tag;
    this.text = text;
    this.uid = uid;
}


//Word Template 
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

//Word Display Template
var wordDisplayTemplate = function (tag, text) {
    var template =
        '<span class="word-ph" >' +
            '<span class="word-nt">' + text + '</span>' +
            '<span class="word-ht" >' + tag + '</span>' +
        '</span>';

    return template;
}
