import {destination, data_array} from "../scripts/database.js";

let create_button = document.getElementById("submit-create-button");
create_button.addEventListener("click", create);

function create() {
    let title = document.querySelector("#title").value;
    let description = document.querySelector("#description").value;
    let price = document.querySelector("#price").value / 1;
    let img = document.querySelector("#create-input-image");
    console.log(img)
    if (!title || !description || !price || !img) {
        alert("Введи"); //Todo Make modal
    }

    let id = 5;
    const new_destination = new destination(id, title, description, price, img, 0);
    data_array.push(new_destination);
}