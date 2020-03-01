import store from "./store.js"
import api from "./api.js"
const render = function () {
    if (store.adding) {
        $('main').html(generateaddBookmarkHtml())
        $('#header').hide()

    } else {
        $('#header').show()
        let html = ``

        if (store.bookmarks) {
            html = html + store.bookmarks.filter(function (item) {
                return item.rating >= store.filter
            }).map(item => generateBookmarkHtml(item))
        }
        $("main").html(html)
    }


    //check if adding store.adding =true
    // if its true , generate code which cutted)
    // else what to show bookmarks//


}



const bindEvents = function () {
    $("#rating-filter").change(function (event) {
        store.filter = parseInt($(event.currentTarget).val())
        render()
    })
    $("#newbookmark").on("click", (e) => {
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
                if (!store.error) {
                    store.addBookmark(data);
                    store.adding = false;

                } else {
                    store.error = data.message
                }
                render();
                store.error = null
            })
    })
    $("main").on("click", ".delete", function (event) {
        let id = $(event.currentTarget).data("item-id")
        api.deleteBookmark(id).then(function () {
            store.deleteBook(id)
            render()
        })
    })
}

let expandedBookmarkHtml;

expandedBookmarkHtml = function () {
    $('main').on('click', '.expand', (e) => {
        let id;
        id = getItemIdFromElement(e.currentTarget);
        console.log("click")
        store.toggleExpandedId(id, true);
        render();
    });
};

const getItemIdFromElement = function () {
    $('main').addEventListener("click", expandedBookmarkHtml);
    const id = generateBookmarkHtml(e.currentTarget);
    console.log('click')
    store.toggleExpandedId(url, true);
    render();
}

function display(description) {
    getItemIdFromElement("description").innerHTML = Data();
}
export default {
    render,
    bindEvents,
    expandedBookmarkHtml,
}
//template generation function
/// listen to events (click on  and submit)
/// render function ( tells the page to put inside the main: tag)HTML method in Jquery
// (if store.adding = true )$("main").html (generatebookmarkform())
//generatebookmarklist(am i on the right path?)

const generateaddBookmarkHtml = function () {

    let html = `<div>
    <header>
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
</form> </div>`
    if (store.error) {
        html += `<h1>${store.error}</h1>`
    }
    return html

}
let generateBookmarkHtml = function (item) {
    if (item.expanded) {
        let expandedBookmarkHtml = `
    <form class="expanded-bookmarks">
    <div class="title-bar">
        <button class="delete" data-item-id='${item.id}'>DELETE</button>
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
        <button class="delete" data-item-id='${item.id}'>DELETE</button>
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