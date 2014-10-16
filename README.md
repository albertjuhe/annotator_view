Margin Viewer for Annotator
==================
##Margin viewer Annotator Plugin

view_annotator.js is a plugin for Annotator to view the current annotations in a panel in the right side.


##Installation

To use the tool you need to install the [Annotator plugin](https://github.com/okfn/annotator/) to annotate text. 


```html
    <script src="../lib/jquery-1.9.1.js"></script>
    <script src="../lib/annotator-full.1.2.9/annotator-full.min.js"></script>
    <!-- Locale for language -->
    <script src="../lib/jquery-i18n-master/jquery.i18n.min.js"></script>
    <!-- For show the annotation creation date -->
    <script src="../lib/jquery.dateFormat.js"></script>
    <!-- File with the translations -->
    <script src="../locale/en/annotator.js"></script>
    <!-- Scroll panel -->
    <script src="../lib/jquery.slimscroll.js"></script>
    <!-- annotator -->
    <link rel="stylesheet" href="../lib/annotator-full.1.2.9/annotator.min.css">
    <link rel="stylesheet" href="../src/css/style.css">
    <!-- anotator plug in -->
    <script src="../src/view_annotator.js"></script>
    <script src="../src/categories.js"></script>
    <script>
      jQuery(function ($) {
                   $.i18n.load(i18n_dict);
               
                    var annotator = $('body').annotator().annotator().data('annotator');
                    var propietary = 'demoUser';
                    annotator.addPlugin('Permissions', {
                        user: propietary,
                        permissions: {
                            'read': [propietary],
                            'update': [propietary],
                            'delete': [propietary],
                            'admin': [propietary]
                     },
                     showViewPermissionsCheckbox: true,
                     showEditPermissionsCheckbox: false
                    });
                  $('body').annotator().annotator('addPlugin', 'Categories',{
                           errata:'annotator-hl-errata',
                           destacat:'annotator-hl-destacat',
                           subratllat:'annotator-hl-subratllat' }
                     );
                  $('body').annotator().annotator('addPlugin', 'AnnotatorViewer');
                  //Annotation scroll
                  $('#anotacions-uoc-panel').slimscroll({height: '100%'});
               });
  </script>
```
##Usage

The annotations that you create are displayed in the panel. You can delete an anotation, you can acces at the point of text that has been anotated, open an annotation, close an annotation, toggle the panel, scroll the panel if there are several annotations and a little label where you can view how many annotations are currently.

You can filters annotations: My annotations and shared annotations.

#Release 1.10
- Edit text annotation in the panel.

##Development

The view annoator plugin, use the property categorize, to change the annotation color category (default value highligth, defined in the css), and an order property to sort the annotations in the panel.

Each annotation in the right panel needs a unique Id, annotator when use a back end, a unique Id is assigned to each annotation after creation, but in the Viewer panel offline I don have this Id, for this reason  we generate the unique Id with a function uniqueId() in the plugin.

##Offline Demo
Demo in demo/anotacions.html
##Online Demo
Complete functional demo with MySQL Backend and developed in nodejs
[Demo Frankenstein](http://ec2-54-191-181-65.us-west-2.compute.amazonaws.com:3060/annotation/mary/demo.html) with [https://github.com/albertjuhe/annotator_nodejs_store] (https://github.com/albertjuhe/annotator_nodejs_store)

The panel in this demo is little different, in the red square you can see How many people is reading the document.
