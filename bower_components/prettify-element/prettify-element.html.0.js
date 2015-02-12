

    Polymer('prettify-element', {

      domReady: function() {
        if (!this.text) {
          if (this.firstElementChild && this.firstElementChild.localName === 'template') {
            this.text = this.firstElementChild.innerHTML;
          } else {
            this.text = this.innerHTML;
          }
        }
      },

      textChanged: function() {
        this.$.content.innerHTML = prettyPrintOne((this.text || '').replace(/</g,'&lt;').replace(/>/g,'&gt;'));
      }

    });

  