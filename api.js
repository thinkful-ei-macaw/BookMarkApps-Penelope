'use strict'

const BASE_URL = "https://thinkful-list-api.herokuapp.com/Penelope"
const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
    .then(res => {
        if (!res.ok) {
            error = { code: res.status};
        }
        return res.json();
    })
    
};
const validateName = function(title) {
    if (!title) {
        throw new TypeError('Must Provide Name');
    }
};
const validateUrl = function(url) {
    if (!url) {
        throw new TypeError('Must Provide Valid URL');
    }
};
const getBookmarks = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
};
const newBookmark = function (title,url,rating,text) {
    const newInput = JSON.stringify({title, rating, url,text });
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
    deleteBookmark
};
// $rating.append('<span id="' + i + '"src="span" />');
// $('<span>', {
//     id: 'rating' + i,
//     src: 'rating'
// }).appendTo($rating);
// var hovered = 0, 
//     star_clicked = 0;
//       for (i = 1; i <= max_stars; i++) {
//         if (i <= hovered) {
//             $('#rating span#' + i).attr('src', 'span');
//         } else {
//             $('#rating span#' + i).attr('src', 'span');
//         }
//     }
//     $(this).prevAll().attr('src', 'span');
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//       };
      
      