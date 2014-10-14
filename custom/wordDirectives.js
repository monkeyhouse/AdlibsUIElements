
// Use in the free-form????????
angular.module('wordDirectives', [])
.directive('word',

    function () {

        return {
            restrict: 'E',
            scope: {
                tag: '@',
                text: '@'
            },
            replace:true,
            template: wordTemplate()           
        }
    });

/*
  var word = '<word tag="' + text + '" text="Placeholder"> </word>' ......;
  var el = $compile(angular.element(word))($scope); 
 */