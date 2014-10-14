angular.module("prototype").config(function ($provide) {

    $provide.decorator('taOptions', [
        'taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
            // $delegate is the taOptions we are decorating
            // register the tool with textAngular
            taRegisterTool('colourRed', {
                iconclass: "fa fa-square red",
                tooltiptext: 'red it',
                action: function() {
                    this.$editor().wrapSelection('forecolor', 'red');
                }
            });

            taRegisterTool('placeholder', {
                tooltiptext: 'Add a placeholder',
                action: function(tagName) {
                    //this.$editor().wrapSelection('forecolor', 'red');
                    //alert('action jackson');

                    if (this.options.some(function(el) {
                        return el.name == tagName;
                    })) {
                        console.log("Created tag " + tagName + ".");
                        var template = wordTemplate("placeholder", tagName);

                        return this.$editor().wrapSelection('insertHTML', template, true);
                    }
                },
                setActive: function(html) {
                    angular.forEach(this.options, function(option) {
                        if (html === option.html) {
                            this.active = option.name;
                            option['active'] = true;
                        } else {
                            option['active'] = false;
                        }
                    });
                },

                options: [
                    { name: 'Noun' },
                    { name: 'Verb' },
                    { name: 'Adjective' },
                    { name: 'Adverb' },
                    { name: 'Interjection' },
                    { name: 'Pronoun' },
                    { name: 'Proper Noun' },
                    { name: 'Preposition' }
                ],

                display:
                    "<span class='dropdown'>                                                                                          " +
                        "    <button class='btn btn-default dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown'>    " +
                        "        Add A Word                                                                                                " +
                        "        <span class='caret'></span>                                                                             " +
                        "    </button>                                                                                                   " +
                        "    <ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1' style='z-index:10000'>                                      " +
                        "<li  role='presentation' ng-repeat='o in options'>" +
                        "<a href='#' type='button' ng-click='action(o.name)'><i ng-if='o.active' class='fa fa-check'></i>{{o.name}}</button>" +
                        "</li>" +
                        "    </ul>                                                                                                       " +
                        " </span>"


                //"<button class='btn btn-default dropdown-toggle' type='button' ng-disabled='showHtml()'><i class='fa fa-font'></i><i class='fa fa-caret-down'></i></button>" +
                //	"<ul class='dropdown-menu'><li ng-repeat='o in options'><button class='checked-dropdown' style='font-size: {{o.css}}' type='button' ng-click='action(o.value)'><i ng-if='o.active' class='fa fa-check'></i> {{o.name}}</button></li></ul>" +
                ,
                onElementSelect: {
                    element: 'word',
                    action: function(event, $element, editorScope) {

                        // Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic
                        event.preventDefault();
                        editorScope.displayElements.popover.css('width', '60px'); //' '120px');
                        var container = editorScope.displayElements.popoverContainer;
                        container.empty();
                        container.css('line-height', '28px');

                        var buttonGroup = angular.element('<div class="btn-group pull-right">');

                        //var editButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-edit icon-edit"></i></button>');
                        //editButton.on('click', function (event) {
                        //    event.preventDefault();
                        //    // 
                        //    var tag = window.prompt('Enter a tag', $element.attr('tag'));
                        //    //todo: use $window
                        //    if (tag && tag !== '' ) {
                        //        $element.attr('tag', tag);
                        //        editorScope.updateTaBindtaTextElement();
                        //    }
                        //    editorScope.hidePopover();
                        //});
                        // buttonGroup.append(editButton);

                        var removeButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on"><i class="fa fa-times-circle icon-remove"></i></button>');
                        removeButton.on('click', function(event) {
                            event.preventDefault();
                            //var text = $element.attr('text');
                            //$element.replaceWith(text);
                            $element.remove();
                            editorScope.updateTaBindtaTextElement();
                            editorScope.hidePopover();
                        });


                        buttonGroup.append(removeButton);

                        container.append(buttonGroup);
                        editorScope.showPopover($element);
                    }
                }

            });


            taRegisterTool('customPlaceholder', {
                tooltiptext: 'Add a custom placholder',
                buttontext: 'Custom Word',
                action: function() {
                    var wordTag = '';
                    wordTag = window.prompt('Please enter a placeholder tag', '');
                    //todo: use $.window
                    if (wordTag && wordTag !== '') {
                        console.log("Created tag " + wordTag + ".");
                        var template = wordTemplate("placeholder", wordTag); // wordTemplate("placeholder", wordTag);


                        return this.$editor().wrapSelection('insertHTML', template, true);
                    }
                }

            });

            return taOptions;
        }
    ]);


});

