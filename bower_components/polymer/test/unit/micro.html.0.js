

  suite('polymer-micro', function() {

    test('polymer-micro element created', function() {
      assert.equal(document.querySelector('x-trivial').textContent, 'x-trivial');
    });

    test('polymer-micro type extension element created', function() {
      assert.equal(document.querySelector('input').value, 'x-extension');
    });

  });

  suite('constructor', function() {

    test('normal constructor', function() {
      var MyElement = Polymer({is: 'my-element'});
      var el = new MyElement();
      document.body.appendChild(el);
      if (Object.__proto__) {
        // instanceof Constructor only supported where proto swizzling is possible
        assert.instanceOf(el, MyElement, 'Instance of MyElement');
      }
      assert.instanceOf(el, HTMLElement, 'Instance of HTMLElement');
    });

    test('type-extension constructor', function() {
      var MyInput = Polymer({is: 'my-input', extends: 'input'});
      var el = new MyInput();
      document.body.appendChild(el);
      if (Object.__proto__) {
        // instanceof Constructor only supported where proto swizzling is possible
        assert.instanceOf(el, MyInput, 'Instance of MyInput');
      }
      assert.instanceOf(el, HTMLElement, 'Instance of HTMLInputElement');
    });

    test('custom constructor', function() {
      var MyElement2 = Polymer({
        is: 'my-element2',
        factoryImpl: function(title){
          this.title = title;
        }
      });
      var el = new MyElement2('my title');
      document.body.appendChild(el);
      if (Object.__proto__) {
        // instanceof Constructor only supported where proto swizzling is possible
        assert.instanceOf(el, MyElement2, 'Instance of MyElement');
        assert.instanceOf(el, HTMLElement, 'Instance of HTMLElement');
      }
      assert.equal(el.title, 'my title', 'Argument passed to constructor');
    });

  });

