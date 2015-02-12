
(function() {
  var strings = [
    "PARKOUR!",
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  ];

  var namegen = {
    generateString: function(inLength) {
      var s = '';
      for (var i=0; i<inLength; i++) {
        s += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      }
      return s;
    },
    generateName: function(inMin, inMax) {
      return this.generateString(Math.floor(Math.random() * (inMax - inMin + 1) + inMin));
    }
  };

  Polymer('list-test', {
    addIdx: 0,
    deleteIdx: 0,
    count: 50000,
    ready: function() {
      this.initArrayFull();
      window.list = this.$.list;
    },
    generateData: function() {
      var names = [], data = [];
      for (var i=0; i<this.count; i++) {
        names.push(namegen.generateName(4, 8));
      }
      names.sort();
      for (i=0; i<this.count; i++) {
        data.push({
          id: i,
          name: names[i],
          details: strings[i % 3],
          image: i % 4,
          value: 0,
          type: 0,
          checked: false
        });
      }
      return data;
    },
    addRecord: function() {
      this.data.splice(this.addIdx, 0, {
        id: ++this.count,
        name: namegen.generateName(4, 8),
        details: strings[this.count % 3],
        image: this.count % 4,
        value: 0,
        type: 0,
        checked: false
      });
    },
    deleteRecord: function() {
      this.data.splice(this.deleteIdx, 1);
    },
    deleteSelection: function() {
      var i, idx;
      if (this.multi) {
        if (this.selection.length) {
          for (i=0; i<this.selection.length; i++) {
            idx = this.data.indexOf(this.selection[i]);
            this.data.splice(idx, 1);
          }
        }
      } else {
        idx = this.data.indexOf(this.selection);
        this.data.splice(idx, 1);
      }
    },
    clearSelection: function() {
      this.$.list.clearSelection();
    },
    deleteAll: function() {
      this.data.splice(0,this.data.length);
      // this.data.length = 0;
    },
    deleteArray: function() {
      this.data = null;
    },
    initArrayEmpty: function() {
      this.data = [];
    },
    initArrayFull: function() {
      this.data = this.generateData();
    }
  });
})();  
