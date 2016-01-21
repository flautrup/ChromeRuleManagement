/**
 * Listens for the app launching then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  var windowWidth = 1024;
  var windowHeight = 700;

  chrome.app.window.create(
    'index.html', {
      //id: 'mainWindow',
      outerBounds: { // 'bounds' is deprecated, and you want full window size
        width: windowWidth,
        height: windowHeight
      },
      resizable: false,
      frame: 'chrome'
    }
  );



});
