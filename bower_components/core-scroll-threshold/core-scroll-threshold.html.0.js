

  Polymer({
    
    publish: {

      /**
       * When set, the given element is observed for scroll position.  When undefined,
       * children can be placed inside and element itself can be used as the scrollable
       * element.
       *
       * @attribute scrollTarget
       * @type Element
       * @default null
       */
      scrollTarget: null,

      /**
       * Orientation of the scroller to be observed (`v` for vertical, `h` for horizontal)
       *
       * @attribute orient
       * @type boolean
       * @default 'v'
       */
      orient: 'v',

      /**
       * Distance from the top (or left, for horizontal) bound of the scroller
       * where the "upper trigger" will fire.
       *
       * @attribute upperThreshold
       * @type integer
       * @default null
       */
      upperThreshold: null,

      /**
       * Distance from the bottom (or right, for horizontal) bound of the scroller
       * where the "lower trigger" will fire.
       *
       * @attribute lowerThreshold
       * @type integer
       * @default null
       */
      lowerThreshold: null,

      /**
       * Read-only value that tracks the triggered state of the upper threshold
       *
       * @attribute upperTriggered
       * @type boolean
       * @default false
       */
      upperTriggered: false,

      /**
       * Read-only value that tracks the triggered state of the lower threshold
       *
       * @attribute lowerTriggered
       * @type boolean
       * @default false
       */
      lowerTriggered: false

    },

    observe: {
      'upperThreshold lowerThreshold scrollTarget orient': 'setup'
    },

    ready: function() {
      this._boundScrollHandler = this.checkThreshold.bind(this);
    },

    setup: function() {
      // Remove listener for any previous scroll target
      if (this._scrollTarget && (this._scrollTarget != this.target)) {
        this._scrollTarget.removeEventListener(this._boundScrollHandler);
      }

      // Add listener for new scroll target
      var target = this.scrollTarget || this;
      if (target) {
        this._scrollTarget = target;
        this._scrollTarget.addEventListener('scroll', this._boundScrollHandler);
      }

      // If we're listening on ourself, make us auto in case someone put
      // content inside
      this.style.overflow = (target == this) ? 'auto' : null;

      // Setup extents based on orientation
      this.scrollPosition = (this.orient == 'v') ? 'scrollTop' : 'scrollLeft';
      this.sizeExtent = (this.orient == 'v') ? 'offsetHeight' : 'offsetWidth';
      this.scrollExtent = (this.orient == 'v') ? 'scrollHeight' : 'scrollWidth';

      // Clear trigger state if user has cleared the threshold
      if (!this.upperThreshold) {
        this.upperTriggered = false;
      }
      if (!this.lowerThreshold) {
        this.lowerTriggered = false;
      }      
    },

    checkThreshold: function(e) {
      var top = this._scrollTarget[this.scrollPosition];
      if (!this.upperTriggered && this.upperThreshold != null) {
        if (top < this.upperThreshold) {
          this.upperTriggered = true;
          this.fire('upper-trigger');
        }
      }
      if (this.lowerThreshold != null) {
        var bottom = top + this._scrollTarget[this.sizeExtent];
        var size = this._scrollTarget[this.scrollExtent];
        if (!this.lowerTriggered && (size - bottom) < this.lowerThreshold) {
          this.lowerTriggered = true;
          this.fire('lower-trigger');
        }
      }
    },

    /**
     * Clear the upper threshold, following an `upper-trigger` event.
     *
     * @method clearUpper
     */
    clearUpper: function(waitForMutation) {
      if (waitForMutation) {
        this._waitForMutation(function() {
          this.clearUpper();
        }.bind(this));
      } else {
        requestAnimationFrame(function() {
          this.upperTriggered = false;
        }.bind(this));
      }
    },

    /**
     * Clear the lower threshold, following a `lower-trigger` event.
     *
     * @method clearLower
     */
    clearLower: function(waitForMutation) {
      if (waitForMutation) {
        this._waitForMutation(function() {
          this.clearLower();
        }.bind(this));
      } else {
        requestAnimationFrame(function() {
          this.lowerTriggered = false;
        }.bind(this));
      }
    },

    _waitForMutation: function(listener) {
      var observer = new MutationObserver(function(mutations) {
        listener.call(this, observer, mutations);
        observer.disconnect();
      }.bind(this));
      observer.observe(this._scrollTarget, {attributes:true, childList: true, subtree: true});
    }

  });

