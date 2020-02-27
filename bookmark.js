import store from "./store.js"
import api from "./api.js"
const render = function () {
    if (store.adding) {
        $('main').html(generateaddBookmarkHtml())
    } else {
        let html = `
        <header>
<h1>BookMarkAPP</h1>
</header>
        <button id ="newbookmark">ADD BOOKMARK</button>

        `
        if (store.bookmarks) {
            html = html + store.bookmarks.map(item => renderitem(item))
        }
        $("main").html(html)
    }


    //check if adding store.adding =true
    // if its true , generate code which cutted)
    // else what to show bookmarks//


}

function mainDataid() {
    return;

}
const bindEvents = function () {
    $("main").on("click", "#newbookmark", (e) => {
        store.adding = true
        this.render()
    })
    $("main").on("submit", "#addform", (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const url = e.target.url.value
        const rating = e.target.rating.value
        const text = e.target.text.value

        api.newBookmark(title, url, rating, text)
            .then(data => {
                store.addBookmark(data)
                store.adding = false
                this.render()
            })
    })
    $("main").on("click", ".delete", function (event) {
        let id = $(event.currentTarget).closest("li").data("item-id")
        api.deleteBookmark(id).then(function () {
            store.deleteBook(id)
            render()
        })
    })
}
const renderitem = function (item) {
    return ` <li data-item-id="${item.id}"> 
${item.title} <button class="delete">DELETE</button>
</li>
`

}
export default {
    render,
    bindEvents
}
//template generation function
/// listen to events (click on  and submit)
/// render function ( tells the page to put inside the main: tag)HTML method in Jquery
// (if store.adding = true )$("main").html (generatebookmarkform())
//generatebookmarklist(am i on the right path?)
const generateBookmark = function () {
    $('main').on('click', '.remove', (e) => {
        e.preventDefault();
        console.log('delete bookmarklist');
        let id = getItemIdFromElement(e.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
                store.removeBookmark(id);
                render();
            })
            .catch((error) => {
                store.setError(error.message);
            });
    });
};

const generatebookmarklist = function () {
    $('main').on('submit', 'main-container', (e) => {
        console.log('create bookmarklist');
        e.preventDefault();
        const name = $('name').val();
        const url = $('url').val();
        const rating = $('.rating:checked').val();
        const desc = $('description').val();
        $('main-container')[0].reset();
        api.newBookmark(store.bookmarks.length, name, rating, url, desc)
            .then((newBookmark) => {
                store.addBookmark(newBookmark);
                store.adding = false;
                render();
            })
            .catch((error) => {
                store.setError(`${error}`);
            });
    });
};
const generateaddBookmarkHtml = function () {
    return `<header>
    <h1>BookMarkAPP</h1>
</header>
<form id="addform">
    <p>Title:</p>
    <input type="text" name="title" placeholder="bookmarklist..">

    <br><label for="ul">Url link:</label></br>
    <input type="url" id="url" name="url">
    <br><label for="ul">Rating:</label></br>
    <select name="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>

    <br> <label for="description">Description:</label></br>
    <ins><textarea name="text" id="" cols="30" rows="10"></textarea></ins>
    <br><button>Submit</button>

</form>`

}
const generateBookmarkHtml = function (item) {
    if (item.expanded) {
        let expandedBookmarkHtml = `
    <form class="expanded-bookmarks">
    <div class="title-bar">
        <button class="remove" data-item-id='${item.id}'>X</button>
        <legend class="saved-title">${item.title}</legend>
    </div>
    <div class="link-btn">
    <a href="${item.url}" target="_blank"><button type="button" class="url-link">Visit Site</button></a>
    </div>
    <div class="display-rating">${item.rating}</div>
    <div class="description-text">
        <p>${item.desc}
        </p>
    </div>
    <div class="expand-button">
        <button type="button" data-item-id='${item.id}' class="expand">Collapse</button>
    </div>
</form>`;
        return expandedBookmarkHtml;
    } else {
        let unexpandedBookmarkHtml = `
    <form class="collapsed-bookmarks">
    <div class="title-bar">
        <button class="remove" data-item-id='${item.id}'>X</button>
        <legend class="saved-title">${item.title}</legend>
        <div class="display-rating-collapsed">${item.rating}</div>
    </div>
    <div class="expand-button">
        <button type="button" data-item-id='${item.id}' class="expand">Expand</button>
    </div>
    </form>`;
        return unexpandedBookmarkHtml;
    }
};