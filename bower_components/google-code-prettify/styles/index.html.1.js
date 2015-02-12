(function () {
  // Produce an iframe per theme.
  // We pass the threme name to the iframe via its URI query, and
  // it loads prettify and the theme CSS, and calls back to this page
  // to resize the iframe.
  for (var i = 0, n = allThemes.length; i < n; ++i) {
    var theme = allThemes[i];
    if (!theme) { continue; }
    var iframe = document.createElement('iframe');
    iframe.name = theme.name;
    iframe.src = 'demo.html?' + encodeURIComponent(theme.name);
    var header = document.createElement('h2');
    header.id = theme.name;
    var linkToThemeSrc = document.createElement('a');
    linkToThemeSrc.href = (
        'http://code.google.com/p/google-code-prettify/source/browse/trunk/' +
        (theme.name === 'default'
         ? 'src/prettify.css'
         : 'styles/' + encodeURIComponent(theme.name) + '.css'));
    linkToThemeSrc.appendChild(document.createTextNode(
       theme.name.replace(/\b[a-z]/g,  // Capitalize first letter of each word
       function (letter) { return letter.toUpperCase(); })));
    header.appendChild(linkToThemeSrc);

    var attribution;
    if (theme.authorHtml) {
      attribution = document.createElement('span');
      attribution.className = 'attribution';
      attribution.innerHTML = 'by ' + theme.authorHtml;
    }

    var div = document.createElement('div');
    div.appendChild(header);
    if (attribution) { div.appendChild(attribution); }
    div.appendChild(iframe);
    document.body.appendChild(div);
  }
})()