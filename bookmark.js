import store from "./store.js"
import api from "./api.js"
const render = function () {
    const html = store.bookmarks.map(item => renderitem(item))
    $("#bookmarklist").html(html)
}
const bindEvents = function () {
    $("#addform").submit(e => {
        e.preventDefault()
        const title = e.target.title.value
        const url = e.target.url.value
        const rating = e.target.rating.value
        const text = e.target.text.value

        api.newBookmark(title, url, rating, text)
            .then(data => {
                store.addBookmark(data)
                this.render()
            })
    })
}
const renderitem = function (item) {
    return ` <li> 
${item.title}
</li>
`

}
export default {
    render,
    bindEvents
}