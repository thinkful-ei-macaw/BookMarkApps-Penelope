import store from "./store.js";

const BASE_URL = "https://thinkful-list-api.herokuapp.com/Penelope"
const listApiFetch = async function (...args) {
    let error;
    const res = await fetch(...args);
    store.error = newFunction(res, error);
    return res.json();

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
const newBookmark = function (title, url, rating, desc) {
    const newInput = JSON.stringify({
        title,
        rating,
        url,
        desc,
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
    store,
    newFunction,
};

function newFunction(res, error) {
    if (!res.ok) {
        error = {
            code: res.status
        };
    }
    return error;
}
