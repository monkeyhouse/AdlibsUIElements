angular.module('localStore', ['LocalStorageModule'])
   
.factory('htmlCache', ['localStorageService', function (localStorageService) {

    var htmlStoreKey = '__HTML_LIB_CACHE_KEY';
  
    return {
        get: function () {
            return localStorageService.get(htmlStoreKey);
        },
        set : function(libHtml) {
            localStorageService.set(htmlStoreKey, libHtml);
        }

    }
   
}])

.factory('wordsCache', ['localStorageService', 'htmlCache', function (localStorageService, htmlCache) {

    var wordsStoreKey = '__WORDS_CACHE_KEY';

  

    return {
        init: function() {
          
            var html = htmlCache.get();

            var wordRegex = /<[ ]*word[^>]+>/g;
            var wordTags = html.match(wordRegex);

            var words = [];

            var tagRegex = new RegExp('tag\s*=\s*[\'\"]([^\'\"]+)[\'\"][^>]*');
            var uidRegex = new RegExp('uid\s*=\s*[\'\"]([^\'\"]+)[\'\"][^>]*');
            for (var i = 0; i < wordTags.length; i++) {

                var word = wordTags[i];
                var tag = tagRegex.exec(word)[1];
                var uid = uidRegex.exec(word)[1];

                words.push(new Word(tag, '', uid));

            }
            this.set(words);
            //return words;
        },
        get: function () {
            return localStorageService.get(wordsStoreKey);
        },
        set : function(words) {
            localStorageService.set(wordsStoreKey, words);
        }

    }
   
}])

.factory('resultFactory', ['htmlCache','wordsCache', function (htmlCache, wordsCache) {

    return {
        get: function () {

            var html = htmlCache.get();

            var words = wordsCache.get();

            //create document fragment from html
            var temp = document.createElement('template');
            temp.innerHTML = html;
            var frag = temp.content;

            while (!!frag.querySelector('word')) {
                var wordEl = frag.querySelector('word');

                var uid = wordEl.getAttribute('uid'),
                    text = '',
                    tag = '';

                //find text, tag from words array
                for (var i = 0; i < words.length; i++) {
                    if (words[i].uid == uid) {
                        var word = words.splice(i, 1)[0];
                        text = word.text;
                        tag = word.tag;
                    }
                };

                var replacement = document.createElement("span");
                replacement.innerHTML = wordDisplayTemplate(tag, text);

                var parent = wordEl.parentNode;
                parent.replaceChild(replacement, wordEl);
            }
            
            //create html from fragment
            var result = document.createElement('span');
            result.appendChild(frag);
            return result.innerHTML;

        }

    }

}]);
