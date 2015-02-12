
(function() {

  Polymer('list-test', {
    ready: function() {
      window.list = this.$.list;
    },
    overLetter: function(e) {
      var target = PolymerGestures.targetFinding.findTarget({clientX: e.clientX, clientY: e.clientY});
      var idx = target && target.templateInstance && target.templateInstance.model && target.templateInstance.model.idx;
      if (idx != null) {
        list.scrollToGroup(idx);
      }
    }
  });
})();  
