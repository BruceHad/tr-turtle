function updatePage(page) {
    if(typeof intId != 'undefined') clearInterval(intId);
    canvas = document.getElementById('canvas-wrapper');
    canvas.innerHTML = '';
    replaceStr = '<canvas id="c" width="300" height="300">';
    replaceStr += '<p>Canvas cannot be displayed.</p>';
    replaceStr += '</canvas>';
    canvas.innerHTML = replaceStr;
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

// check for #url

if(window.location.hash != ""){
    updatePage(window.location.hash.substr(1));
}