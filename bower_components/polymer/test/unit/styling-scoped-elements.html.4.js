
(function() {
  var doc = document._currentScript.ownerDocument;
  var dynamic = doc.querySelector('template#dynamic');

  Polymer({
    is: 'x-dynamic-scope',
    ready: function() {
      // setup node for scope watching
      this.scopeSubtree(this.$.container, true);
      // simulate 3rd party action by using normal dom to add to element.
      var dom = document.importNode(dynamic.content, true);
      this.$.container.appendChild(dom);
    }
  });
})();
