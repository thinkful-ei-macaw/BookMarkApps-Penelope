import bookmark from "./bookmark.js"
import api from "./api.js"
import store from "./store.js";
const main = function () {
    api.getBookmarks()
        .then(data => {
            console.log(data)
            data.forEach(element => {
                store.addBookmark(element)
            });
            bookmark.render()
        })
bookmark.bindEvents()

}
$(main)
var settings = {
  "url": "https://thinkful-list-api.herokuapp.com/Penelope/bookmarks",
  "method": "GET",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/javascript"
  },
  "data": "{\n    \"title\": \"Penelope\",\n    \"url\": \"http://google.com\"\n}",
};

$.ajax(settings).done(function (main) {
  console.log(api);
});