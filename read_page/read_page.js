class destination {
    constructor(id, image, name, description, price, last_updated) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.description = description;
        this.price = price;
        this.last_updated = last_updated;
    }

}

const destination1 = new destination("1", "../assets/SkadarMontenegro.svg", "Moldova", "Молдо́ва, офіційна назва — Респу́бліка Молдо́ва — держава у Східній Європі, має вихід до моря через річку Дунай у районі села Джурджулешти. На півночі, сході й півдні межує", 2, 0)
const destination2 = new destination("2", "../assets/SkadarMontenegro.svg", "Mo23312ldova", "Молдо́ва, офіційна назва — Респу́бліка Молдо́ва — держава у Східній Європі, має вихід до моря через річку Дунай у районі села Джурджулешти. На півночі, сході й півдні межує", 3, 0)
const destination3 = new destination("3", "../assets/SkadarMontenegro.svg", "Moldova", "Молдо́ва, офіційна назва — Респу́бліка Молдо́ва — держава у Східній Європі, має вихід до моря через річку Дунай у районі села Джурджулешти. На півночі, сході й півдні межує", 1, 0)
let data_array = [destination1, destination2, destination3];

window.addEventListener("load", showElements(data_array));

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
        temp_container.appendChild(clone);
    }
}

function deleteElement(elem) {
    let element = elem.parentNode.parentNode.parentNode.parentNode;
    let id = element.querySelector("#id").innerText;
    const obj_to_delete = data_array.find(destination => destination.id === id);
    data_array.splice(data_array.indexOf(obj_to_delete), 1);
    element.remove();
}

function search(input){
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
        console.log(i);
        console.log(elements);
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