
    document.querySelector('#first').onclick = function(e) {
      this.selected = (this.selected + 1) % this.items.length;      
    };

    document.querySelector('core-pages.fancy').onclick = function(e) {
      this.selected = (this.selected + 1) % this.items.length;
      this.async(function() {
        if (this.selectedIndex == 0) {
          this.selectedItem.classList.remove('begin');
        } else if (this.selectedIndex == this.items.length - 1) {
          this.items[0].classList.add('begin');
        }
      });
    };
  