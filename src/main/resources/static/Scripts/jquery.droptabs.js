/* Copyright (c) 2014 Alexandru Boboc
 * Droptabs v.1.1 Jquery Plugin
 * Tested with JQuery 1.11.1
 */

(function ($) {

    $.fn.droptabs = function (o) {

        //Default options
        var s = $.extend({
            dropdownSelector: "li.dropdown",
            dropdownMenuSelector: "ul.dropdown-menu",
            dropdownTabsSelector: "li",
            visibleTabsSelector: ">li:not(.dropdown)",
            developmentId: "dt-devInfo",
            autoArrangeTabs: false,
            development: false,
            othertext:""
        }, o);
        s.othertext = this.find(".dropdown-toggle:last").text();
      
        return this.each(function () {

            var $container = $(this);
            var dropdown = $(s.dropdownSelector, this);
            var dropdownMenu = $(s.dropdownMenuSelector, dropdown);

            var $dropdownTabs = function () {
                return $(s.dropdownTabsSelector, dropdownMenu);
            }

            var $visibleTabs = function () {
                return $(s.visibleTabsSelector, $container);
            }

            function getFirstHiddenElementWidth() {
                var tempElem = $dropdownTabs().first().clone().appendTo($container).css("position", "fixed");
                var hiddenElementWidth = $(tempElem).outerWidth();
                $(tempElem).remove();
                return hiddenElementWidth;
            }

            function getHiddenElementWidth(elem) {
                var tempElem = $(elem).clone().appendTo($container).css("position", "fixed");
                var hiddenElementWidth = $(tempElem).outerWidth();
                $(tempElem).remove();
                return hiddenElementWidth;
            }

            function manageActive(elem) {
                //fixes a bug where Bootstrap can't remove the 'active' class on elements after they've been hidden inside the dropdown
                $('a', $(elem)).on('show.bs.tab', function (e) {
                    $(e.relatedTarget).parent().removeClass('active');
                })
                $('a', $(elem)).on('shown.bs.tab', function (e) {
                    if ($(dropdown).hasClass('active')) {
                        $('>a', dropdown).html(($('>li.active>a', dropdownMenu).html()).substring(0, 10) + ' <b class="caret"></b>');
                    } else {
                        $('>a', dropdown).html(s.othertext+' <b class="caret"></b>');
                    }
                })

            }

            //Start Development info
            if (s.development) {
                var $developmentDiv = $('#' + s.developmentId);
                function devPrint(label, elem) {

                }
            }
            //End Development info

            var visibleTabsWidth = function () {
                var visibleTabsWidth = 15;
                $($visibleTabs()).each(function (index) {
                    visibleTabsWidth += parseInt($(this).outerWidth(), 10);
                });
                visibleTabsWidth = visibleTabsWidth + parseInt($(dropdown).outerWidth(), 10);
                return visibleTabsWidth;
            }

            var availableSpace = function () {
                return $container.outerWidth() - visibleTabsWidth();
            }

            var arrangeTabs = function () {
                //Start Development info
                if (s.development) {
                    devPrint("Container width", $container.outerWidth());
                    devPrint("Visible tabs width", visibleTabsWidth());
                    devPrint("Available space", availableSpace());
                    devPrint("First hidden", getFirstHiddenElementWidth());
                }
                //End Development info	

                if (availableSpace() < 0) {//we will hide tabs here
                    var x = availableSpace();
                    $($visibleTabs().get().reverse()).each(function (index) {
                        if (!($(this).hasClass('always-visible'))) {
                            $(this).prependTo(dropdownMenu);
                            x = x + $(this).outerWidth();
                            if (($(this).hasClass('active'))) {

                                if ($(this).parent().attr("role") == "menu") {
                                    $(dropdown).addClass('active');
                                    $(dropdown).children("a:first").html($(this).children("a:first").text() + ' <b class="caret"></b>');
                                }
                            }
                        }
                        if (x >= 0) { return false; }
                    });
                }

                if (availableSpace() > getFirstHiddenElementWidth()) { //and here we bring the tabs out
                    var x = availableSpace();
                    $($dropdownTabs()).each(function (index) {
                        if (getHiddenElementWidth(this) < x && !($(this).hasClass('always-dropdown'))) {
                            $(this).appendTo($container);
                            x = x - $(this).outerWidth();
                            if ($(this).hasClass("active")) {
                                $(dropdown).removeClass("active");
                                $(dropdown).children("a:first").html($(dropdown).attr("dropdown-name") + ' <b class="caret"></b>');
                            }
                        } else { return false; }
                    });
                }

                if ($dropdownTabs().length <= 0) { dropdown.hide(); } else { dropdown.show(); }
            }

            //init

            if (s.autoArrangeTabs) {
                var tempTabs = [];
                $($visibleTabs().get().reverse()).each(function (index) {
                    if ($(this).hasClass('always-visible')) {
                        tempTabs.push($(this));
                        $(this).remove();
                    }
                });
                for (var i = 0; i < tempTabs.length; i++) {
                    $container.prepend(tempTabs[i]);
                }
            }

            $(document).ready(function () {
                $(dropdown).attr("dropdown-name", $(dropdown).children("a:first").text());
                arrangeTabs();
                $dropdownTabs().each(function () {
                    manageActive($(this));
                });

                $visibleTabs().each(function () {
                    manageActive($(this));
                });
            });

            $(window).resize(function () {
                arrangeTabs();
            });
            return this;
        });
    }
}(jQuery));
