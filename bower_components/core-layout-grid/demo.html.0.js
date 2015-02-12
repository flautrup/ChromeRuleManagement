

    Polymer('grid-test', {
      arrangements: [[
        [1, 1, 1, 1],
        [2, 3, 3, 4],
        [2, 3, 3, 5]
      ], [
        [4, 3, 2],
        [5, 3, 2],
        [5, 1, 1]
      ], [
        [1, 1],
        [2, 3],
        [4, 3]
      ]],

      outputLayout: 0,

      ready: function() {
        this.outputLayoutChanged();
      },

      outputLayoutChanged: function() {
        this.layout = this.arrangements[this.outputLayout];
      },

      toggleLayout: function() {
        this.outputLayout = (this.outputLayout + 1) % this.arrangements.length;
      },

      rotate: function() {
        this.toggleLayout();
      }
    });

  