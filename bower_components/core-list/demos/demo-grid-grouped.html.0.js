
(function() {

  Polymer('list-test', {
    ready: function() {
      window.list = this.$.list;
      var flat = false;  // Switch to test flat vs. nested
      var nestedData = flat ? null : [];
      var data = [];
      var groups = [];
      var gidx = 0;
      var gitem = 0;
      var gmax = 3;
      var count = 1000;
      for (var i=0; i<count; i++) {
        data.push({
          image: 'http://placehold.it/150x150/' + Math.floor(Math.random()*0xFFFFFF).toString(16) + '/ffffff&text=Index%20' + i,
          caption: 'Caption ' + i
        });
        var group = groups[gidx];
        if (!group) {
          if (nestedData) {
            group = groups[gidx] = {label: 'Group ' + gidx, length: 0};
          } else {
            group = groups[gidx] = {
              length: 0,
              data: {label: 'Group ' + gidx}
            };
          }
          gmax += 4;
          gmax %= 30;
        }
        if (++group.length >= gmax || i == count-1) {
          gidx++;
          if (nestedData) {
            nestedData.push(data);
            data = [];
          } else {
            group.data.length = group.length;
          }
        }
      }
      this.data = nestedData || data;
      this.groups = groups;
    }
  });
})();  
