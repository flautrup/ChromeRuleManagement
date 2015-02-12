//<![CDATA[
(function () {
  function html(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var quineHtml = html(
        '<!DOCTYPE html>\n<html>\n'
      + document.documentElement.innerHTML 
      + '\n<\/html>\n');

  // Highlight the operative parts:
  quineHtml = quineHtml.replace(
    /&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g,
    '<span class="operative">$&</span>');

  document.getElementById("quine").innerHTML = quineHtml;
})();
//]]>
