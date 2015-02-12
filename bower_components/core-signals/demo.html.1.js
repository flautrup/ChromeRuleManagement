
  Polymer('my-app', {
    fooSignal: function(e, detail, sender) {
      this.innerHTML += '<br>[my-app] got a [' + detail + '] signal<br>';
    }
  });
