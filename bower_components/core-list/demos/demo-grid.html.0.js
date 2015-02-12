
(function() {

  Polymer('list-test', {
    ready: function() {
      window.list = this.$.list;
      var data = [];
      var groups = [];
      var gidx = 0;
      var gitem = 0;
      var gmax = 3;
      for (var i=0; i<1000; i++) {
        var color = Math.floor(Math.random()*0xFFFFFF).toString(16);
        data.push({
          image: 'http://placehold.it/150x150/' + color + '/ffffff&text=Index%20' + i,
          caption: 'Caption ' + i,
          color: color
        });
      }
      this.data = data;
    }
  });
})();  
