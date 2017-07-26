/*global moment*/

(function(window, document, moment) {
  moment().format();
  window.addEventListener('load', function() {
    var bmState = {};

    function updateState(name, data){
      bmState[name] = data;
      if(Object.keys(bmState).length === 3) updateHtml(bmState);
    }

    function getMonths(){
      return new Promise(function(succeed){
        var req = new XMLHttpRequest();
        req.open('GET', 'https://desolate-lowlands-22051.herokuapp.com/api/all_months', true);
        req.addEventListener('load', function(){
          if (req.status < 400) {
            // Parse the response into an array of months.
            var months = JSON.parse(req.responseText);
            var monthArray = [];
            for(var i in months){
              monthArray.push(months[i]['bookmark_month']);
            }
            monthArray.reverse(); // descending
            succeed(monthArray);
          }
        });
        req.send(null);
      });
    }

    function getParameters(){
      if(window.location.search != '') {
        var urlParams = window.location.search.slice(1).split('&');
        for(var i in urlParams){
          var param = urlParams[i].split('=');
          if(param[0] === 'month' || param[0] === 'cat') {
            var params = {};
            params[param[0]] = param[1];
            return params;
          }
        }
      }
      return null;
    }

    function getBookmarks(params){
      return new Promise(function(succeed){
        var baseUrl = 'https://desolate-lowlands-22051.herokuapp.com/api/';
        if(params){
          if(Object.keys(params)[0] === 'cat') var url = baseUrl+'category/'+params['cat'];
          else url = baseUrl+'month/'+params['month'].replace('-','/');
        }
        else {
          url = 'https://desolate-lowlands-22051.herokuapp.com/api/recent';
        }
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.addEventListener('load', function(){
          if (req.status < 400) {
            succeed(JSON.parse(req.responseText));
          }
        });
        req.send(null);
      });
    }

    function buildBookmarks(data){
      var ul = document.createElement('ul');
      ul.className = 'bookmarks-list';
      for (var i = 0; i < data.length; i++){
        var li = document.createElement('li');

        var div = document.createElement('div');
        div.className = 'name';
        var a = document.createElement('a');
        a.className = 'link';
        a.href = data[i].bookmark_url;
        a.textContent = data[i].bookmark_name;
        div.appendChild(a);
        li.appendChild(div);

        div = document.createElement('div');
        div.className = 'date';
        div.textContent = moment(data[i].bookmark_date).format('Do MMMM YYYY');
        li.appendChild(div);

        div = document.createElement('div');
        div.className = 'link-description';
        div.textContent = data[i].description;
        li.appendChild(div);

        div = document.createElement('div');
        div.className = 'category';
        a = document.createElement('a');
        a.href = 'index.html?cat='+data[i].category.toLowerCase()+'#side';
        a.textContent = data[i].category;
        div.appendChild(a);
        li.appendChild(div);
        ul.appendChild(li);
      }
      return ul;
    }

    function buildNav(months, current){
      var monthActive = true;
      if(current === null){
        // no active month chosen
        current = 0;
        monthActive = false;
      }
      // console.log(current, monthActive);
      var navMonths = [months[current+1], months[current], months[current-1]];
      var nav = document.createElement('nav');
      nav.className = 'clearfix bookmarks-nav';
      for(var i in navMonths){
        if(typeof navMonths[i] != 'undefined'){
          var div = document.createElement('div');
          if(monthActive && navMonths[i] == months[current]){
            var span = document.createElement('span');
            span.className = 'active';
            span.textContent = navMonths[i];
            div.appendChild(span);
          }
          else {
            var a = document.createElement('a');
            a.href='index.html?month='+navMonths[i]+'#side';
            a.textContent = navMonths[i];
            div.appendChild(a);
          }
          nav.appendChild(div);
        }
      }
      return nav;
    }

    function updateHtml(data){
      var monthIndex;
      // console.log(data['parameters']);
      // Determine current month index
      if(data['parameters']){
        if(typeof data['parameters']['month'] != 'undefined') {
          monthIndex = data['months'].indexOf(data['parameters']['month']);
        }
        else monthIndex = null;
      }
      else {
        monthIndex = null;
      }
      var bookmarks = buildBookmarks(data['bookmarks']);
      var navigation = buildNav(data['months'], monthIndex);
      var lb = document.querySelector('#tr-linkblog');
      lb.removeChild(document.querySelector('.loading'));
      lb.appendChild(navigation);
      lb.appendChild(bookmarks);
    }

    var parameters = getParameters();
    updateState('parameters', parameters);
    getBookmarks(parameters).then(function(bookmarks){
      updateState('bookmarks', bookmarks);
    });

    getMonths().then(function(months){
      updateState('months', months);
    });
  });
})(window, document, moment);
