var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
  _index = lunr(function () {
      this.field('title', {boost: 10})
      this.field('body')
      this.ref('id')
    })    

Annotator.Plugin.Search = (function(_super) {
__extends(Search, _super);


//Default tinymce configuration
Search.prototype.options = {};

function Search(element,options) {
  _ref = Search.__super__.constructor.apply(this, arguments);
  return _ref;
};

Search.prototype.events = {
      'annotationsLoaded': 'onAnnotationsLoaded'   
};

Search.prototype.pluginInit = function() {
    if (!Annotator.supported()) {
        return;
    }
      
    
    this.annotator
      .subscribe("annotationCreated", this.addDocument);

    this.annotator
      .subscribe("annotationDeleted", this.removeDocument);

    this.annotator
      .subscribe("annotationUpdated", function (annotation) {
        this.removeDocument(annotation);
        this.addDocument(annotation);
      });      
}

Search.prototype.addDocument = function(annotation) {
   _index.add({
      id: annotation.id,
      title: annotation.quote,
      body: annotation.text
    })    
}

Search.prototype.removeDocument = function(annotation) {
  _index.remove({ref:annotation.id})   
}


Search.prototype.onAnnotationsLoaded = function(annotations) {
      var annotation;
      
      if (annotations.length > 0) {
        for(i=0, len = annotations.length; i < len; i++) {
          annotation = annotations[i];
          _index.add({
            id: annotation.id,
            title: annotation.quote,
            body: annotation.text
          })
        }
        
      }
      
    };

return Search;

})(Annotator.Plugin);