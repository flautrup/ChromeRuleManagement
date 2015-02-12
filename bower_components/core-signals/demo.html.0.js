
  Polymer('my-element', {
    ready: function() {
      this.asyncFire('core-signal', {name: "foo", data: "Foo!"});
    }
  });
