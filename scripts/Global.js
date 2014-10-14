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



String.prototype.startsWithVowel = function () {
    
    var chr = this.substring(0, 1).toUpperCase();
         
    return chr == 'A' |
           chr == 'E' |
           chr == 'I' |
           chr == 'O' |
           chr == 'U';
};
    

