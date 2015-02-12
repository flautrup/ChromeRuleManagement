
(function() {

  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  Polymer('list-test', {
    scale: 0.7,
    ready: function() {
      window.list = this.$.list;
    }
  });
})();  
