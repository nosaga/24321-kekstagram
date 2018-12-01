'use strict';


var getUnique = function (items) {
  var item;
  for (var i = 0; i < items.length; i++) {
    item = items.splice(i);
  }
  console.log(item);
}


var getUrl = function () {
  for (var i = 0; i < 26; i++) {
    var url = 'photos/' + i + '.jpg';
    getUnique(url);
  }
};

var picture = [
  {
    url: getUrl();
  }
]
