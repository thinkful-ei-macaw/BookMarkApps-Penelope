let store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0

    //api call to get a list of bookmarks ( index.js call api.js
    //method call method, bookmark.js /createbookmark.**looking to adding =false or true
    // using the bookmarks in my store. if adding is true show form for adding bookmark.//)
    // add bookmark button/ update store to change adding to true. call render method wont show list of bookmarks with show createbookpage html. )

};

class deleteBook {
    constructor(id) {
        return this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
    }
}


const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark)
}
const toggleExpandedId = function (id) {
    let bookmark = findById(id);
    bookmark.expanded = !bookmark.expanded;
    return bookmark.expanded;
};
export default {
    ...store,
    deleteBook,
    addBookmark,


}