
angular.module('prototype', ['textAngular', 'localStore'])
    .controller('taEditor', [
        '$scope', 'htmlCache',
        function($scope, htmlCache) {

            var me = $scope;

            me.saveHtml = function() {
                htmlCache.set(me.htmlcontent);
            }

            me.revertHtml = function() {
                me.htmlcontent = htmlCache.get();
            }

            me.resetHtml = function() {
                me.htmlcontent = me.orightml;
            }

            //init local vars
            me.orightml = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p></p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li>Super Easy <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>TextAngular Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
            me.revertHtml();
            me.disabled = false;

            if (!me.htmlcontent) {
                me.htmlcontent = me.orightml;
            }

        }
    ])
    .controller('fillIn', ['$scope', 'wordsCache', function($scope, wordsCache) {
            var me = $scope;

            var init = function(words) {
                me.words = words;
                me.wordIndex = 0;
                me.wordsLeft = words.length - 1;
                me.updateArticle();
            };


            me.nextWord = function() {
                if (me.wordsLeft > 0) {
                    me.wordIndex++;
                    me.wordsLeft--;
                    me.updateArticle();

                    wordsCache.set(me.words);
                }


            }

            me.done = function() {
                wordsCache.set(me.words);
            }

            me.prevWord = function() {
                me.wordIndex--;
                me.wordsLeft++;
                me.updateArticle();
            }

            me.isNotNext = function() {
                return me.wordsLeft < 1;
            }

            me.isNotPrev = function() {
                return me.wordIndex < 1;
            }

            me.updateArticle = function() {
                var word = me.words[me.wordIndex].tag;
                me.A_or_AN_Article = word.startsWithVowel() ? 'an' : 'a';
            }

            me.loadWords = function() {
                wordsCache.init();
                init(wordsCache.get());
            };

            me.loadWords();


        }
    ])
.controller('reveal', ['$scope','resultFactory', function($scope, resultFactory) {

        var me = $scope;

        me.showResults = function () {
            var res = resultFactory.get();
            me.resultContent = res;
        }

        me.resultContent = '';


    }])

.controller('scrollController', ['$anchorScroll', '$scope', function ($scope, $anchorScroll) {
    return; //do nothing
    //use scroll controller to load $anchorScroll module & library
}]);
    


//service to store in local storage
