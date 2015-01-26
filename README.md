# liveFilter
jquery extension for live filtering elements on a page based on a text input


Here is a jsFiddle demo: http://jsfiddle.net/y4rc5aoo/

The extension is used by selecting an input element, calling the extension function, and passing both a parent and child selector (and optional callback once filtering was complete).

$("#inputElement").liveFilter("parentSelector","childSelector",function(){});

The parentSelector is expected to be a jQuery acceptable selector which will represent the set of elements that will be hidden.

The "childSelector" is expected to be a jQuery acceptable selector which will represent the set of elements inside of the "parentSelector" whose text will be examined with regards to the search terms.

Prefacing any search term with ! will give results excluding those words.

The search terms will be partially matched, so alf will be found in alfonzo.
