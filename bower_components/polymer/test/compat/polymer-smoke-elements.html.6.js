

  Polymer({

    is: 'x-fancy-annotations',

    created: function() {
      // NOTE: annotations feature turns on automatically at prototype level,
      // need to gate this as it's affecting all elements with templates
      // now.
      // Create bindings from annotations.
      this.marshalBoundNodes();
      // These properties automatically propagate to DOM as defined
      // by the template annotations.
      this.exclaim = 'Hey';
      this.state = 'on';
    }
  });

