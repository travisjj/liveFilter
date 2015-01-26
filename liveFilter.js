$.fn.liveFilter = function(parentSelector, childSelector, callback) {
    var filterBox = this;
    filterBox[0].placeholder = "Filter...";
    var skip = false;
    var skipLock;
    filterBox.focus(function() {
        $(this).unbind('focus'); //run once on focus
        this.setAttribute("data-previous-value", "");
        var validCallback = $.isFunction(callback);

        function checkFilter(filter) {
            if (skip) return;
            var prevValue = filter.getAttribute("data-previous-value");
            if (filter.value == prevValue || filter.value == "!") return;
            var and = "";
            if (filter.value.length > prevValue.length) {
                //increasing
                if (filter.value.indexOf(prevValue) > -1) {
                    and = ":visible"; //only filter the ones left
                }
            } else {
                //decreasing    
                if (prevValue.indexOf(filter.value) > -1) {
                    and = ":hidden"; //only filter the ones which aren't showing
                }
            }
            filter.setAttribute("data-previous-value", filter.value);
            var search = filter.value.toString().toUpperCase();
            if (search.indexOf("!") > -1) and = "";
            var searchItems = search.match(/\S+/g) || [];
            var hideIt = $();
            var showIt = $();

            var $filterArea = $(parentSelector + and);
            $filterArea.each(function() {
                var flag = 0;
                for (var ind = 0; ind < searchItems.length; ind++) {
                    var notFlag = true;
                    $(this).find(childSelector).each(function() {
                        var current = this.innerText || this.textContent;
                        current = current.toUpperCase();
                        if (searchItems[ind][0] === "!") {
                            //exclude this word if present or add to flag
                            var toSearch = searchItems[ind].substr(1);
                            if (toSearch.length == 0) {
                                return false;
                            }
                            //look for search item
                            if (current.indexOf(toSearch) != -1) {
                                notFlag = false;
                                return false;
                            }
                        } else {
                            notFlag = false;
                            //look for search item
                            if (current.indexOf(searchItems[ind]) != -1) {
                                flag++;
                                return false;
                            }
                        }
                    });
                    if (notFlag) flag++;
                }
                if (flag == searchItems.length) {
                    showIt = showIt.add(this);
                } else {
                    hideIt = hideIt.add(this);
                }
            });
            showIt.show();
            hideIt.hide();
            if (validCallback) callback();
        }
        filterBox.bind("input", function() {
            clearTimeout(skipLock);
            skip = true;
            var me = this;
            skipLock = setTimeout(function() {
                skip = false;
                checkFilter(me);
            }, 350); //only filter every 350 milliseconds
        });
    });
};
