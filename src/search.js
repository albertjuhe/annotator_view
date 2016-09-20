/*
Annotator view panel Plugin v1.0 (https://https://github.com/albertjuhe/annotator_view/)
Copyright (C) 2014 Albert Juhé Brugué
License: https://github.com/albertjuhe/annotator_view/License.rst
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
*/
var _ref,
    __bind = function (fn, me) {
        return function () {
            return fn.apply(me, arguments);
        };
    },
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) {
        for (var key in parent) {
            if (__hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }

        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

_index = lunr(function () { //Define document search
    this.field('title', {boost: 10});
    this.field('body');
    this.ref('id')
});

Annotator.Plugin.Search = (function (_super) {
    __extends(Search, _super);


//Default tinymce configuration
    Search.prototype.options = {};

    function Search(element, options) {
        this.onResetSearch = __bind(this.onResetSearch,this);
        this.searchAnnotator = __bind(this.searchAnnotator,this);

        _ref = Search.__super__.constructor.apply(this, arguments);
        return _ref;
    }

    Search.prototype.events = {
        'annotationsLoaded': 'onAnnotationsLoaded',
        '.annotator-panel-reset click': "onResetSearch"
    };

    Search.prototype.pluginInit = function () {
        if (!Annotator.supported()) {
            return;
        }

        this.annotator.subscribe("annotationCreated", this.addDocument);

        this.annotator.subscribe("annotationDeleted", this.removeDocument);

        this.annotator.subscribe("annotationUpdated", function (annotation) {
                this.removeDocument(annotation);
                this.addDocument(annotation);
            });

        //Adding search capabilities to the annotator Viewer
        if (typeof(this.annotator.plugins.AnnotatorViewer)!='undefined') {
         //Adding a input box for search
            $('li.filter-panel').before('<input class="search" id="search" type="text" results/><a class="annotator-panel-reset" href="#clear">Reset</a>');
            $('input#search').on('change',this.searchAnnotator);
        }
    };

    //Event triggered when reset the search text
    Search.prototype.onResetSearch = function(event) {
        $('input#search').val("");
        this.resetSearch();
    };

    Search.prototype.searchAnnotator = function () {
        var searchText = $('input#search').val().trim();

        if (searchText.length > 2) {
           var results = _index.search(searchText);
           $('li.annotator-marginviewer-element').removeClass('found');
           results.map(function(result){
               $('li#annotation-'+result.ref).addClass('found');
           });
           $('li.annotator-marginviewer-element:not(.found)').hide();
           $('li.annotator-marginviewer-element.found').show();
        } else if (searchText.length==0) {
           this.resetSearch();
        }
    };

    //Event triggered when reset the search text
    Search.prototype.resetSearch = function() {
        $('li.annotator-marginviewer-element').removeClass('found');
        $('li.annotator-marginviewer-element').show();
    };


    Search.prototype.addDocument = function (annotation) {
        _index.add({
            id: annotation.id,
            title: annotation.quote,
            body: annotation.text,
            user: annotation.id
        })
    };

    Search.prototype.removeDocument = function (annotation) {
        _index.remove({ref: annotation.id})
    };


    Search.prototype.onAnnotationsLoaded = function (annotations) {
        var annotation;

        if (annotations.length > 0) {
            for (var i = 0, len = annotations.length; i < len; i++) {
                annotation = annotations[i];
               this.addDocument(annotation);
            }

        }

    };

    return Search;

})(Annotator.Plugin);
