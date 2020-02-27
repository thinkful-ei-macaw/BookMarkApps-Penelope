const store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0

    //api call to get a list of bookmarks ( index.js call api.js
    //method call method, bookmark.js /createbookmark.**looking to adding =false or true
    // using the bookmarks in my store. if adding is true show form for adding bookmark.//)
    // add bookmark button/ update store to change adding to true. call render method wont show list of bookmarks with show createbookpage html. )

};

const store = {
    bookmarks: [],
    id: '',
    title: 'The Notebook',
    rating: '1',
    url: 'http://www.famousbooks.com',
    expanded: true
};

const store = {
    bookmarks: [],
    id: '',
    title: 'Test',
    rating: '2',
    url: 'http://www.education.com',
    expanded: true
};
const store = {
    bookmarks: [],
    id: '',
    title: 'Dinosaurs',
    rating: '4',
    url: 'http://www.science.com',
    expanded: false
};


const deleteBook = function (id) {
    return this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id)
}


const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark)
}
export default {
    ...store,
    deleteBook,
    addBookmark,


}