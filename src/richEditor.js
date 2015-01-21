var _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Annotator.Plugin.RichEditor = (function(_super) {
__extends(RichEditor, _super);


//Default tinymce configuration
  RichEditor.prototype.options = {
    tinymce:{
      selector: "li.annotator-item textarea",
      plugins: "media image insertdatetime link paste",
      menubar: false,
      statusbar: false,
      toolbar_items_size: 'small',
      extended_valid_elements : "",
         toolbar: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | link image media pastetext",
    }
  };

function RichEditor(element,options) {
  _ref = RichEditor.__super__.constructor.apply(this, arguments);
  return _ref;
};


RichEditor.prototype.pluginInit = function() {
    if (!Annotator.supported()) {
        return;
    }    
    //Controlling tinymc content text, we can get the rich from the tinymce
    tinymce.init(this.options.tinymce);
    this.annotator
      .subscribe("annotationCreated", function (annotation) {
          annotation.text = tinymce.activeEditor.getContent();
  
      });
    this.annotator
      .subscribe("annotationEditorShown", function (annotation) {
         var text = typeof annotation.annotation.text!='undefined'?annotation.annotation.text:'';         
         tinymce.activeEditor.setContent(text);
  
      });

    this.annotator
      .subscribe("annotationUpdated", function (annotation) {
         annotation.text = tinymce.activeEditor.getContent();
  
      });      
      this.annotator.viewer.addField({
        load: function (field, annotation) {
          EditorViewerTextField = $(field.parentElement).find('div:first-of-type');
          $(EditorViewerTextField).html(annotation.text);
          
          console.log(annotation.text);
        }
      })

      
}



return RichEditor;

})(Annotator.Plugin);