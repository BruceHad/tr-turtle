function updatePage(page) {
    var content = document.getElementById('content');
    content.innerHTML = '';
    var replaceStr = '<div id="content">';
    replaceStr += '<canvas id="c" width="750" height="750">';
    replaceStr += '<p>Canvas cannot be displayed.</p>';
    replaceStr += '</canvas>';
    replaceStr += '</div>';
    content.innerHTML = replaceStr;
    replaceJs('js/' + page + '.js');
}

function replaceJs(newFile) {
    // Remove existing js file (script tag call my-script).
    var oldScript = document.getElementById("my-script");
    oldScript.parentNode.removeChild(oldScript);
    // Create and insert new script tag.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", newFile);
    script.setAttribute("id", "my-script");
    document.head.appendChild(script);
}