// Required by Webpack - do not touch
require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import 'bootstrap'

let initial_cards = [
    {
        place: "Salt Lake City, Utah",
        desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas atque itaque quod facere vel nostrum, quae illo alias consequatur voluptatem. Laboriosam quod possimus nulla sequi dolorem expedita aut voluptatibus asperiores!",
        poster: "https://images.unsplash.com/photo-1597778602022-f2d97b8c1493?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80"
    }, {
        place: "Ancient Cathedral, Salt Lake City, Utah",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dignissimos fugiat aperiam, doloribus eius deleniti dicta labore repellendus, eaque odit ut nam? Id autem est voluptatem, dicta dolores voluptates nisi.",
        poster: "https://images.unsplash.com/photo-1603937372023-251acb738be8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80"
    }
]

function hideForm(){
    document.querySelector("#card-form").classList.add("d-none")
    document.querySelector("#cards").classList.remove("d-none")
}

function hideCards(){
    document.querySelector("#card-form").classList.remove("d-none")
    document.querySelector("#cards").classList.add("d-none")
}

function getCards(){
    if(localStorage.getItem('cards') && localStorage.getItem('cards') != '[]'){
        return JSON.parse(localStorage.getItem('cards'))
    }else{
        return initial_cards;
    }
}

function addNewCard(event){
    event.preventDefault();

    let t = document.querySelector('#place').value;
    let d = document.querySelector('#desc').value;
    let p = document.querySelector('#poster').value;

    let cards = getCards();

    if(t && d && p){
        let card = {place: t, desc: d, poster: p}
        cards.push(card);
        localStorage.setItem('cards', JSON.stringify(cards));

        this.reset();
        displayCards();
    }
}

function displayCards() {
    let cards = initial_cards;
    let cards_html = ""
    let index = 0;
    for (let c of cards) {
        cards_html += `
          <div class="card col mb-3" data-index="${index}">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${c.poster}" class="img-fluid rounded-start" alt="${c.place}">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${c.place}</h5>
                    <p class="card-text">${c.desc}</p>
                    <p class="card-text"><button class="btn btn-danger to-delete">Delete</button></p>
                </div>
                </div>
            </div>
            </div>
          `;
          index++;
    }
    document.querySelector("#cards").innerHTML = cards_html;
    document.querySelectorAll('.to-delete').forEach(function(btn){
        btn.onclick = function(event){
            if(confirm('Are you sure?')){
                cards.splice(event.target.closest('.col').dataset.index, 1);
                localStorage.setItem('cards', JSON.stringify('cards'));
                displayCards();
            }
        }
    })
    hideForm();
}


document.querySelector('#card-form').onsubmit = addNewCard;
document.querySelector('#new-card').onclick = hideCards;

document.querySelector('.to-cancel').onclick = hideForm;
displayCards();