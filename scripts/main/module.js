
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
            me.orightml = '<h2><word tag="Verb" text="placeholder" uid="_acw59w877"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Verb</span></span></word> me!</h2><p>I pledge allegiance to the <word tag="Noun" text="placeholder" uid="_klna3vu3l"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Noun</span></span></word>  of the <word tag="Noun" text="placeholder" uid="_t7a1d3zwt"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Noun</span></span></word> , and to the Republic for which it stands, one Nation <word tag="Preposition" text="placeholder" uid="_fohgsgdsr"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Preposition</span></span></word> God, indivisible, with liberty and <word tag="Plural Noun" text="placeholder" uid="_z2l595nqv"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Plural Noun</span></span></word> for all.</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li><word tag="Adjective" text="placeholder" uid="_lhexnk7tn"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Adjective</span></span></word>  <b>Theming</b> Options</li><li style="color: green;">Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li class="text-danger">Doesn\'t Use an iFrame</li><li>Works <word tag="Preposition" text="placeholder" uid="_wq8js9ydo"><span class="word-ph"><span class="word-nt">placeholder</span><span class="word-ht">Preposition</span></span></word> Firefox, Chrome, and IE8+</li></ol><p><b>TextAngular Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a></p> <p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p>';
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

            me.updateArticle = function () {
                if (!me.words || !me.words[me.wordIndex])
                    return 'a';

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
