
  var configureBehavior = {

    changeHandlerCount: 0,
    objectChangeHandlerCount: 0,

    contentChanged: function() {
      this.changeHandlerCount++;
      this.stomp = 10;
    },
    objectChanged: function() {
      this.objectChangeHandlerCount++;
    }
  };

