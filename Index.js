import bookmark from "./bookmark.js"
import api from "./api.js"
import store from "./store.js";
const main = function () {
    api.getBookmarks()
        .then(data => {
            data.forEach(element => {
                store.addBookmark(element)
            });
            bookmark.render()
        })
bookmark.bindEvents()

}
$(main)