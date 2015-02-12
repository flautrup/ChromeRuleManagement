
var allThemes = [
  { name: 'default' },
  { name: 'desert',
    authorHtml: '<a href="http://code.google.com/u/@VhJeSlJYBhVMWgF7/">'
        + 'techto&hellip;@<\/a>' },
  { name: 'sunburst', authorHtml: 'David Leibovic' },
  { name: 'sons-of-obsidian',
    authorHtml: '<a href="http://CodeTunnel.com/blog/post/71'
        + '/google-code-prettify-obsidian-theme">Alex Ford<\/a>' },
  { name: 'doxy', authorHtml: 'Robert Sperberg' },
];

// Called by the demo.html frames loaded per theme to
// size the iframes properly and to allow them to tile
// the page nicely.
function adjustChildIframeSize(themeName, width, height) {
  if (typeof console != 'undefined') {
    try {
      console.log('adjusting ' + themeName + ' to ' + width + 'x' + height);
    } catch (ex) {
      // Don't bother logging log failure.
    }
  }

  var container = document.getElementById(themeName).parentNode;
  container.style.width = (+width + 16) + 'px';
  container.style.display = 'inline-block';
  var iframe = container.getElementsByTagName('iframe')[0];
  iframe.style.height = (+height + 16) + 'px';
}
