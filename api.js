import store from "./store";
const BASE_URL = "https://thinkful-list-api.herokuapp.com/Penelope"
const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = {
                    code: res.status
                };
            }
            return res.json();
        })

};
const validateName = function (title) {
    if (!title) {
        throw new TypeError('Must Provide Name');
    }
};

const validateUrl = function (url) {
    if (!url) {
        throw new TypeError('Must Provide Valid URL');
    }
};
const getBookmarks = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
};
const newBookmark = function (title, url, rating, text) {
    const newInput = JSON.stringify({
        title,
        rating,
        url,
        text
    });
    return listApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newInput
    });
};
const deleteBookmark = function (id) {
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
        method: 'DELETE'
    });
};
export default {
    validateName,
    validateUrl,
    newBookmark,
    getBookmarks,
    deleteBookmark,
    ...store,
};