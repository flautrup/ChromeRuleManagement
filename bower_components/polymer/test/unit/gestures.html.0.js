

    suite('Polymer.Gestures api', function() {

      var elt;

      setup(function() {
        elt = document.createElement('div');
        document.body.appendChild(elt);
      });

      teardown(function() {
        document.body.removeChild(elt);
      });

      test('add tap', function() {
        Polymer.Gestures.add('tap', elt, null);
        assert.equal(elt._tap, 1);
      });

      test('add track', function() {
        Polymer.Gestures.add('track', elt, null);
        assert.equal(elt._track, 1);
      });

      test('remove tap', function() {
        Polymer.Gestures.add('tap', elt, null);
        assert.equal(elt._tap, 1);
        Polymer.Gestures.remove('tap', elt, null);
        assert.equal(elt._tap, 0);
      });

      test('remove track', function() {
        Polymer.Gestures.add('track', elt, null);
        assert.equal(elt._track, 1);
        Polymer.Gestures.remove('track', elt, null);
        assert.equal(elt._track, 0);
      });


    });

    suite('simulate events', function() {

      var app;

      setup(function() {
        app = document.createElement('x-app');
        document.body.appendChild(app);
      });

      teardown(function() {
        document.body.removeChild(app);
      });

      test('tap on x-foo and check localTarget and rootTarget', function() {
        var foo = app.$.foo;
        var div = foo.$.div;
        foo.dispatchEvent(new CustomEvent('click'));
        assert.equal(app._testLocalTarget, foo);
        assert.equal(app._testRootTarget, foo);
      });

      test('tap on x-foo.div and check localTarget and rootTarget', function() {
        var foo = app.$.foo;
        var div = foo.$.div;
        div.dispatchEvent(new CustomEvent('click'));
        assert.equal(app._testLocalTarget, foo);
        assert.equal(app._testRootTarget, div);
        assert.equal(foo._testLocalTarget, div);
        assert.equal(foo._testRootTarget, div);
      });

    });

  