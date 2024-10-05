let button_search = document.getElementById("button_search");
let button_count = document.getElementById("button-count");
let button_reset = document.getElementById("button-reset");
let sort_input = document.getElementById("sort");
let create_button = document.getElementById("create-button-menu");
let modal_background = document.querySelector("#background-modal");
let create_submit_button = document.getElementById("submit-create-button");
modal_background.addEventListener("click", close_modal);
window.addEventListener("load", showElements);
button_count.addEventListener("click", countPrice);
button_search.addEventListener("click", showElements);
button_reset.addEventListener("click", cleanSearch);
sort_input.addEventListener("change", showElements);
create_button.addEventListener("click", create_modal);
create_submit_button.addEventListener("click", create_element);

let sum = 0;

function callDeleteEndpoint(id){
    const endpointUrl = 'https://localhost:44359/destination/delete/' + id;
    return fetch(endpointUrl, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.status === 204) {
                console.log('Delete successful, no content returned');
                return;
            }
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function callGetAllEndpoint(search, sort) {
    switch (sort) {
        case "name (A-Z)":
            sort = "name_asc";
            break;
        case "name (Z-A)":
            sort = "name_desc";
            break;
        case "price (0-99+)":
            sort = "price_asc";
            break;
        case "price (99+-0)":
            sort = "price_desc";
            break;
        default:
            sort = "";
    }
    let endpointUrl;
    if (!search && !sort){
        endpointUrl = `https://localhost:44359/destination/get`;
    }
    else if (!search){
        endpointUrl = `https://localhost:44359/destination/get?sort=${sort}`;
    }
    else if (!sort){
        endpointUrl = `https://localhost:44359/destination/get?search=${search}`;
    }
    else{
        endpointUrl = `https://localhost:44359/destination/get?search=${search}&sort=${sort}`;
    }
    return fetch(endpointUrl, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function callCreateEndpoint(data) {
    const endpointUrl = 'https://localhost:44359/destination/add';
    return fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        if (response.status === 204) {
            console.log('Create successful, no content returned');
            return;
        }
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.status);
        }
            return response.json();
        })
        .catch(error => {
            alert("name should be unique")
        });
}

function callPutEndpoint(id, data){
    const endpointUrl = `https://localhost:44359/destination/update/${id}`;
    return fetch(endpointUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        if (response.status === 204) {
            console.log('Updated successful, no content returned');
            return;
        }
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.status);
        }
        return response.json();
    })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function callGet1Elem(id){
    const endpointUrl = `https://localhost:44359/Destination/Get/${id}`;
    return fetch(endpointUrl, {
        method: "GET"
    }).then(response => {
        if (response.status === 200){
            return response.json();
        }else{
            throw new Error('Network response was not ok ' + response.status);
        }
    })
}

function callGetTotalPrice() {
    const id_list = [];
    document.querySelectorAll("#id").forEach(id => id_list.push(id.innerText));
    const data = JSON.stringify({ destinationIds: id_list });
    const endpointUrl = "https://localhost:44359/Destination/GetTotalPrice";
    return fetch(endpointUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        if (response.status === 200) {
            return response.json().then(value => {
                sum = value;
                return value; // Ensure the promise resolves with the value
            });
        } else {
            throw new Error("Not working " + response.status + " " + response.statusText);
        }
    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function showElements() {
    let sort = document.querySelector("#input_search").value;
    let search = document.querySelector("#sort").value;
    clearScreen();
    callGetAllEndpoint(sort, search).then(data_array => {
        const destinations = data_array.destinations;
        destinations.forEach(destination => showElement(destination));
    });
}

function showElement(destination){
    const temp_container = document.getElementById("item-storage");
    const template = document.getElementById("item");
    const clone = template.content.cloneNode(true);
    const id = clone.querySelector("#id");
    id.innerText = destination.id;
    const img = clone.querySelector("#item-image");
    img.src = destination.image;
    const name = clone.querySelector("div.item-info > h1");
    name.innerText = destination.name;
    const description = clone.querySelector("#description-item");
    description.innerText = destination.description;
    const price = clone.querySelector("#price");
    price.innerText = destination.price;
    const last_updated = clone.querySelector("#item-updated-at");
    last_updated.innerText = "\n" + destination.lastUpdated.slice(0, 10) + "\n" + destination.lastUpdated.slice(11, 19);
    clone.querySelector("#button-remove").addEventListener("click", deleteElement, this);
    clone.querySelector("#button-edit").addEventListener("click", edit_modal, this);
    temp_container.appendChild(clone);
}

function deleteElement(elem) {
    elem = elem.srcElement;
    let element = elem.parentNode.parentNode.parentNode.parentNode;
    let id = element.querySelector("#id").innerText;
    callDeleteEndpoint(id);
    element.remove();
}

async function countPrice() {
    await callGetTotalPrice();
    document.querySelector("#total_price").innerText = sum;
}

async function create_element(){
    let title = document.querySelector("#title-modal").value;
    let description = document.querySelector("#description-modal").value;
    let price = document.querySelector("#price-modal").value / 1;
    let img = document.querySelector("#image-modal").files[0];
    if (img===undefined) {
        modal_error("image");
        return;
    }
    let img_src = "../assets/RajaAmpatIndonesia.svg";
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
    const jsonData = JSON.stringify({
        image: img_src,
        name: title,
        description: description,
        price: price
    });
    await callCreateEndpoint(jsonData);
    close_modal();
    clearScreen();
    showElements();
}

async function edit_item(id){
    let title = document.querySelector("#title-edit-modal").value;
    let description = document.querySelector("#description-edit-modal").value;
    let price = document.querySelector("#price-edit-modal").value / 1;
    let image = document.querySelector("#image-edit-modal").files[0];
    if (!title || !description || !price || image === undefined) {
        if (!title) {
            modal_error("title");
            return;
        } else if (!description) {
            modal_error("description");
            return;
        } else if (!price) {
            modal_error("price");
            return;
        } else  if (image === undefined){
            modal_error("image");
            return;
        }
    }
    let data = JSON.stringify({
        image: "../assets/RajaAmpatIndonesia.svg",
        name: title,
        description: description,
        price: price
    })
    await callPutEndpoint(id, data);
    close_modal();
    clearScreen();
    showElements();
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

function cleanSearch() {
    clearScreen();
    document.querySelector("#input_search").value = null;
    showElements();
}

function edit_modal(element){
    element = element.srcElement;
    let edit_modal_div = document.querySelector("#edit-modal");
    let modal_background = document.querySelector("#background-modal");
    let body = document.querySelector("#body");
    edit_modal_div.style.display = "flex";
    modal_background.style.display = "block";
    body.style.overflow = "hidden";
    let id = element.parentNode.parentNode.parentNode.parentNode.querySelector("#id").innerText;
    callGet1Elem(id).then(elem =>{
        edit_modal_div.querySelector("#title-edit-modal").value = elem.name;
        edit_modal_div.querySelector("#description-edit-modal").value = elem.description;
        edit_modal_div.querySelector("#price-edit-modal").value = elem.price / 1;
    });
    edit_modal_div.querySelector("#submit-edit-button").addEventListener("click", () => edit_item(id));
}

function close_error_modal(){
    let error_modal = document.querySelector("#error-modal");
    error_modal.style.display = "none"
}

function modal_error(error_type){
    let error_modal = document.querySelector("#error-modal");
    error_modal.style.display = "flex";
    error_modal.querySelector("#error-value").innerText = error_type;
    setTimeout(() => {close_error_modal()}, 3000);
}

function create_modal(){
    let create_modal_div = document.querySelector("#create-modal");
    let modal_background = document.querySelector("#background-modal");
    let body = document.querySelector("#body");
    create_modal_div.style.display = "flex";
    modal_background.style.display = "block";
    body.style.overflow = "hidden";
    create_modal_div.querySelector("#title-modal").value = "";
    create_modal_div.querySelector("#description-modal").value = "";
    create_modal_div.querySelector("#price-modal").value = "";
    create_modal_div.querySelector("#image-modal").value = null;
}

function clearScreen(){
    let elements = document.querySelectorAll(".item");
    for (let i of elements){
        i.remove();
    }
}


function log(){
    console.log("Hello")
}
const myPromise = new Promise(log => {
    setTimeout(() => {
        log("hello");
    }, 300);
});

async function dsa(){
    try {
        await myPromise;
    } catch (e){
        throw e;
    }
}

