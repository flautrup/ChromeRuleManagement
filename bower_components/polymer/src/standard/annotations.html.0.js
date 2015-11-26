

/**
 * Scans a template to produce an annotation object that stores expression 
 * metadata along with information to associate the metadata with nodes in an 
 * instance.
 *
 * Elements with `id` in the template are noted and marshaled into an 
 * the `$` hash in an instance. 
 * 
 * Example
 * 
 *     &lt;template>
 *       &lt;div id="foo">&lt;/div>
 *     &lt;/template>
 *     &lt;script>
 *      Polymer({
 *        task: function() {
 *          this.$.foo.style.color = 'red';
 *        }
 *      });
 *     &lt;/script>
 * 
 * Other expressions that are noted include:
 *
 * Double-mustache annotations in text content. The annotation must be the only
 * content in the tag, compound expressions are not (currently) supported.
 *
 *     <[tag]>{{path.to.host.property}}<[tag]>
 *
 * Double-mustache annotations in an attribute.
 *
 *     <[tag] someAttribute="{{path.to.host.property}}"><[tag]>
 *
 * Only immediate host properties can automatically trigger side-effects.
 * Setting `host.path` in the example above triggers the binding, setting
 * `host.path.to.host.property` does not.
 *
 * `on-` style event declarations.
 *
 *     <[tag] on-<event-name>="{{hostMethodName}}"><[tag]>
 *
 * Note: **the `annotations` feature does not actually implement the behaviors
 * associated with these expressions, it only captures the data**. 
 * 
 * Other optional features contain actual data implementations.
 *
 * @class standard feature: annotations
 */

/*

Scans a template to produce an annotation map that stores expression metadata
and information that associates the metadata to nodes in a template instance.

Supported annotations are:

  * id attributes
  * binding annotations in text nodes
    * double-mustache expressions: {{expression}}
    * double-bracket expressions: [[expression]]
  * binding annotations in attributes
    * attribute-bind expressions: name="{{expression}} || [[expression]]"
    * property-bind expressions: name*="{{expression}} || [[expression]]"
    * property-bind expressions: name:="expression"
  * event annotations
    * event delegation directives: on-<eventName>="expression"

Generated data-structure:

  [
    {
      id: '<id>',
      events: [
        {
          mode: ['auto'|''],
          name: '<name>'
          value: '<expression>'
        }, ...
      ],
      bindings: [
        {
          kind: ['text'|'attribute'|'property'],
          mode: ['auto'|''],
          name: '<name>'
          value: '<expression>'
        }, ...
      ],
      // TODO(sjmiles): confusingly, this is annotation-parent, not node-parent
      parent: <reference to parent annotation>,
      index: <integer index in parent's childNodes collection>
    },
    ...
  ]

TODO(sjmiles): this module should produce either syntactic metadata
(e.g. double-mustache, double-bracket, star-attr), or semantic metadata
(e.g. manual-bind, auto-bind, property-bind). Right now it's half and half.

*/

  Polymer.Base._addFeature({

    // registration-time

    _prepAnnotations: function() {
      if (!this._template) {
        this._notes = [];
      } else {
        // TODO(sorvell): ad hoc method of plugging behavior into Annotations
        Polymer.Annotations.prepElement = this._prepElement.bind(this);
        this._notes = Polymer.Annotations.parseAnnotations(this._template);
        Polymer.Annotations.prepElement = null;
      }
    },

    _prepElement: function(element) {
      Polymer.ResolveUrl.resolveAttrs(element, this._template.ownerDocument);
    },

    // instance-time

    findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,

    // marshal all teh things
    _marshalAnnotationReferences: function() {
      if (this._template) {
        this._marshalIdNodes();
        this._marshalAnnotatedNodes();
        this._marshalAnnotatedListeners();
      }
    },

    // push configuration references at configure time
    _configureAnnotationReferences: function() {
      this._configureTemplateContent();
    },

    // nested template contents have been stored prototypically to avoid 
    // unnecessary duplication, here we put references to the 
    // indirected contents onto the nested template instances
    _configureTemplateContent: function() {
      this._notes.forEach(function(note) {
        if (note.templateContent) {
          var template = this.findAnnotatedNode(this.root, note);
          template._content = note.templateContent;
        }
      }, this);
    },

    // construct `$` map (from id annotations)
    _marshalIdNodes: function() {
      this.$ = {};
      this._notes.forEach(function(a) {
        if (a.id) {
          this.$[a.id] = this.findAnnotatedNode(this.root, a);
        }
      }, this);
    },

    // concretize `_nodes` map (from anonymous annotations)
    _marshalAnnotatedNodes: function() {
      if (this._nodes) {
        this._nodes = this._nodes.map(function(a) {
          return this.findAnnotatedNode(this.root, a);
        }, this);
      }
    },

    // install event listeners (from event annotations)
    _marshalAnnotatedListeners: function() {
      this._notes.forEach(function(a) {
        if (a.events && a.events.length) {
          var node = this.findAnnotatedNode(this.root, a);
          a.events.forEach(function(e) {
            this.listen(node, e.name, e.value);
          }, this);
        }
      }, this);
    }

  });

