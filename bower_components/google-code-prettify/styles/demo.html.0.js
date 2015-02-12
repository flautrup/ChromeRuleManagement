
// This page displays some code styled using a theme named in the
// query part of the URL.
var themeName = decodeURIComponent(document.location.search.replace(/^\?/, ''));

// Call out to the parent so that it can resize the iframe once this
// document's body is loaded.
function adjustHeightInParent() {
  if (parent !== window) {
    try {
      var div = document.body.getElementsByTagName('div')[0];
      parent.adjustChildIframeSize(
          themeName, div.offsetWidth, div.offsetHeight);
    } catch (ex) {
      // Can happen when this page is opened in its own tab.
    }
  }
}

// Load the necessary CSS
(function () {
  document.title = 'Theme ' + themeName;
  // Load the stylesheet that we're demoing.
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = themeName === 'default'
      ? '../src/prettify.css' : themeName + '.css';
  document.getElementsByTagName('head')[0].appendChild(link);
})();
