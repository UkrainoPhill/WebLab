import {data_array, destination} from "../scripts/database.js"

let button_search = document.getElementById("button_search");
let button_count = document.getElementById("button-count");
let button_reset = document.getElementById("button-reset");
let sort_input = document.getElementById("sort");
let create_button = document.getElementById("create-button-menu");
let modal_background = document.querySelector("#background-modal");
let create_submit_button = document.getElementById("submit-create-button");
modal_background.addEventListener("click", close_modal);
window.addEventListener("load", showElements(data_array));
button_count.addEventListener("click", countPrice);
button_search.addEventListener("click", search, this);
button_reset.addEventListener("click", cleanSearch);
sort_input.addEventListener("change", sortBy, this);
create_button.addEventListener("click", create_modal);
create_submit_button.addEventListener("click", create_element);

function cleanSearch() {
    clearScreen();
    showElements(data_array);
}

function showElements(data_array) {
    for (let i in data_array) {
        const temp_container = document.getElementById("item-storage");
        const template = document.getElementById("item");
        const clone = template.content.cloneNode(true);
        const id = clone.querySelector("#id");
        id.innerText = data_array[i].id;
        const img = clone.querySelector("#item-image");
        img.src = data_array[i].image;
        const name = clone.querySelector("div.item-info > h1");
        name.innerText = data_array[i].name;
        const description = clone.querySelector("#description-item");
        description.innerText = data_array[i].description;
        const price = clone.querySelector("#price");
        price.innerText = data_array[i].price;
        const last_updated = clone.querySelector("#item-updated-at");
        last_updated.innerText = data_array[i].last_updated;
        clone.querySelector("#button-remove").addEventListener("click", deleteElement, this);
        clone.querySelector("#button-edit").addEventListener("click", edit_modal, this);
        temp_container.appendChild(clone);
    }
}

function deleteElement(elem) {
    elem = elem.srcElement;
    let element = elem.parentNode.parentNode.parentNode.parentNode;
    let id = element.querySelector("#id").innerText;
    const obj_to_delete = data_array.find(destination => destination.id === id);
    data_array.splice(data_array.indexOf(obj_to_delete), 1);
    element.remove();
}

function search(input){
    input = input.srcElement;
    let textInput = input.parentNode.parentNode.querySelector("#input_search").value;
    const destinations = data_array.filter(destination => destination.name === textInput);
    clearScreen();
    showElements(destinations);
}

function countPrice(){
    const items = document.querySelectorAll(".item");
    let sum = 0;
    for (const item of items) {
        let price = item.querySelector("#price").innerText;
        sum += price/1;
    }
    sum += "$";
    document.querySelector("#total_price").innerText = sum;
}

function sortBy(sort_value){
    sort_value = sort_value.srcElement.value;
    const data = backToObject();
    if (sort_value === "name (A-Z)"){
        data.sort( (a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
    else if (sort_value === "name (Z-A)"){
        data.sort( (a, b) => (b.name > a.name) ? 1 : ((a.name > b.name) ? -1 : 0));
    }
    else if (sort_value === "price (0-99+)"){
        data.sort( (a, b) => a.price - b.price);
    }
    else if (sort_value === "price (99+-0)"){
        data.sort( (a, b) => b.price - a.price);
    }
    clearScreen();
    showElements(data);
}

function clearScreen(){
    let elements = document.querySelectorAll(".item");
    for (let i of elements){
        i.remove();
    }
}

function backToObject(){
    const items = document.querySelectorAll(".item");
    const item_list = [];
    for (let item of items){
        let id = item.querySelector("#id").innerText / 1;
        let name = item.querySelector("#name-item").innerText;
        let image = item.querySelector("#item-image").src;
        const description = item.querySelector("#description-item").innerText;
        const price = item.querySelector("#price").innerText / 1;
        const last_updated = item.querySelector("#item-updated-at").innerText;
        const object = new destination(id, image, name, description, price, last_updated);
        item_list.push(object);
    }
    return item_list;
}

function create_modal(){
    let create_modal_div = document.querySelector("#create-modal");
    let modal_background = document.querySelector("#background-modal");
    let body = document.querySelector("#body");
    create_modal_div.style.display = "flex";
    modal_background.style.display = "block";
    body.style.overflow = "hidden";
}



function create_element(){
    let title = document.querySelector("#title-modal").value;
    let description = document.querySelector("#description-modal").value;
    let price = document.querySelector("#price-modal").value / 1;
    let img = document.querySelector("#image-modal").files[0];
    console.log(img);
    if (img===undefined) {
        modal_error("image");
        return;
    }
    let img_src = URL.createObjectURL(img);
    if (!title || !description || !price) {
        if (!title) {
            modal_error("title");
            return;
        } else if (!description) {
            modal_error("description");
            return;
        } else if (!price) {
            modal_error("price");
            return;
        }
    }
    let id = data_array[data_array.length - 1].id;
    let last_updated = new Date().toDateString().split(" ").slice(1, 4);
    console.log(last_updated);
    const new_destination = new destination(id, img_src, title, description, price, last_updated);
    data_array.push(new_destination);
    close_modal();
    clearScreen();
    showElements(data_array);
}


function modal_error(error_type){
    let error_modal = document.querySelector("#error-modal");
    error_modal.style.display = "flex";
    error_modal.querySelector("#error-value").innerText = error_type;
    setTimeout(() => {close_error_modal()}, 3000);
}

function close_error_modal(){
    let error_modal = document.querySelector("#error-modal");
    error_modal.style.display = "none"
}

function edit_modal(element){
    element = element.srcElement;
    let edit_modal_div = document.querySelector("#edit-modal");
    let modal_background = document.querySelector("#background-modal");
    let body = document.querySelector("#body");
    edit_modal_div.style.display = "flex";
    modal_background.style.display = "block";
    body.style.overflow = "hidden";
    let id = element.parentNode.parentNode.parentNode.parentNode.querySelector("#id").innerText / 1;
    edit_modal_div.querySelector("#title-edit-modal").value = data_array.find(destination => destination.id === id).name;
    edit_modal_div.querySelector("#description-edit-modal").value = data_array.find(destination => destination.id === id).description;
    edit_modal_div.querySelector("#price-edit-modal").value = data_array.find(destination => destination.id === id).price / 1;
    edit_modal_div.querySelector("#submit-edit-button").addEventListener("click", () => edit_item(id));
}

function edit_item(id){
    let title = document.querySelector("#title-edit-modal").value;
    let description = document.querySelector("#description-edit-modal").value;
    let price = document.querySelector("#price-edit-modal").value / 1;
    if (!title || !description || !price) {
        if (!title) {
            modal_error("title");
            return;
        } else if (!description) {
            modal_error("description");
            return;
        } else if (!price) {
            modal_error("price");
            return;
        }
    }
    let last_updated = new Date().toDateString().split(" ").slice(1, 4);
    const destination = data_array.find(destination => destination.id === id);
    let img = document.querySelector("#image-edit-modal").files[0];
    if (img !== undefined) {
        destination.image = URL.createObjectURL(img);
    }
    destination.name = title;
    destination.description = description;
    destination.price = price;
    destination.last_updated = last_updated;
    close_modal();
    clearScreen();
    showElements(data_array);
}

function close_modal(){
    let body = document.querySelector("#body");
    let edit_modal_div = document.querySelector("#edit-modal");
    let create_modal_div = document.querySelector("#create-modal");
    create_modal_div.style.display = "none";
    edit_modal_div.style.display = "none";
    modal_background.style.display = "none";
    body.style.overflow = "visible";
    close_error_modal();
}