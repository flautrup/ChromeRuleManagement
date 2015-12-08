

    Polymer({

      behaviors: [
        Polymer.BehaviorA,
        Polymer.BehaviorB
      ],

      properties: {

        foo: {
          type: String,
          reflectToAttribute: true,
          readOnly: true,
          observer: '_fooChanged'
        }

      },

      _fooChanged: function(foo) {
        this.__foo = foo;
      }

    });

  