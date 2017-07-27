/*global moment*/

// moment().format();

window.addEventListener('load', function() {
  
  // Bookmarks

  const dateFormat = 'Do MMMM YYYY';

  function createElem(name, className) {
    let elem = document.createElement(name);
    elem.className = className;
    return elem;
  }

  function getMonths() {
    // Gets a list of all months with a bookmark
    return new Promise(function(succeed) {
      let req = new XMLHttpRequest();
      req.open('GET', 'https://desolate-lowlands-22051.herokuapp.com/api/all_months', true);
      req.addEventListener('load', function() {
        if (req.status < 400) {
          // Parse the response into an array of months.
          let months = JSON.parse(req.responseText);
          let monthArray = [];
          for (let i in months) {
            monthArray.push(months[i]['bookmark_month']);
          }
          monthArray.reverse(); // descending
          succeed(monthArray);
        }
      });
      req.send(null);
    });
  }

  function getBookmarks() {
    // Get most recent bookmarks
    return new Promise(function(succeed) {
      let url = 'https://desolate-lowlands-22051.herokuapp.com/api/recent';
      let req = new XMLHttpRequest();
      req.open('GET', url, true);
      req.addEventListener('load', function() {
        if (req.status < 400) {
          let bookmarks = JSON.parse(req.responseText);
          succeed(bookmarks);
        }
      });
      req.send(null);
    });
  }

  function getParameters() {
    // Gets navigation parameters from URL.
    if (window.location.search != '') {
      let urlParams = window.location.search.slice(1).split('&');
      for (let i in urlParams) {
        let param = urlParams[i].split('=');
        if (param[0] === 'month' || param[0] === 'cat') {
          let params = {};
          params[param[0]] = param[1];
          return params;
        }
      }
    }
    return null;
  }



  function buildBookmarksHTML(bookmarks) {
    let ul = createElem('ul', 'bookmarks-list');
    for (let i = 0; i < bookmarks.length; i++) {

      let name = bookmarks[i].bookmark_name;
      let href = bookmarks[i].bookmark_url;
      let date = moment(bookmarks[i].bookmark_date).format(dateFormat);
      let description = bookmarks[i].description;

      let html = `<li><a href='${href}'>${name}</a> <small>(${date})</small></li>`;
      ul.innerHTML += html;
    }
    return ul;
  }

  function updateHTML(bookmarks) {
    let bookmarksUL = buildBookmarksHTML(bookmarks);
    let lb = document.querySelector('#tr-linkblog');
    lb.removeChild(document.querySelector('.loading'));
    lb.appendChild(bookmarksUL);
  }

  let parameters = null;
  getBookmarks(parameters)
    .then(updateHTML);
    
  // Spinner
  let elem = document.querySelector('.loading .ellip');
  let frames = ['', '.', '..', '...'];
  let i = 3, timer = 0;
  let intid = setInterval(function() {
    i += 1;
    timer += 1;
    if (i > 3) {
      i = 0;
    }
    elem.innerHTML = frames[i];
    if (timer > 100) {
      clearInterval(intid);
      elem.innerHTML = '...';
    }
  }, 250);
});
