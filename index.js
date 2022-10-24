import { menuArray } from "./data.js";
let pizzaCount=0
let burgerCount=0
let friesCount=0
let mocktailCount=0
let total=0


document.body.addEventListener('click', function(e){
    if(e.target.dataset.key){
        handleIncrement(e.target.dataset.key)
    } else (e.target.dataset.rkey){
        handleRemove(e.target.dataset.rkey)
    }
    
})



let friesHtml=``
let mocktailHtml=``
let pizzaHtml =``
let burgerHtml=``
function handleIncrement(id){
    let orderHtml = ``
    
    id=parseInt(id)
    const itemObj = menuArray.filter(item=>
        item.id === id)[0]    
    if(id===0){
        
        pizzaCount++
        pizzaHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*pizzaCount}</span>
        </div>
        `
        total +=itemObj.price
    } else if (id===1){
        burgerCount++
        burgerHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients">remove</span></span> 
            <span>$${itemObj.price*burgerCount}</span>
        </div>
        `
        total +=itemObj.price
    } else if (id===2){
        friesCount++
        friesHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients">remove</span></span> 
            <span>$${itemObj.price*friesCount}</span>
        </div>
        `
        total +=itemObj.price
    } else if (id===3){
        mocktailCount++
        mocktailHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients">remove</span></span> 
            <span>$${itemObj.price*mocktailCount}</span>
        </div>
        `
        total +=itemObj.price
    }
    orderHtml = `<div class="listedItems">
    <span class="eachItem-details name">Total price:</span><span>$${total}</span>
    </div>`
    document.getElementById('toCheckOut').innerHTML = pizzaHtml+burgerHtml+friesHtml+mocktailHtml
    document.getElementById('total').innerHTML = orderHtml
    
}

function handleRemove(){

}

function getHTML(){
    let feedHtml = ``

    menuArray.forEach(item=>
        feedHtml += `
        <div class="eachItem">
            <img src="${item.emoji}" class="emoji" alt="">
            <div class="item-text">
                <h1 class="eachItem-details name">${item.name}</h1>
                <p class="eachItem-details ingredients">${item.ingredients}</p>
                <h3 class="eachItem-details price">$${item.price}</h3>
            </div>
            <div class="regular" data-key="${item.id}" >+</div>
        </div>    
        `)

    return feedHtml

}

function render(){
    document.querySelector('#items').innerHTML = getHTML()
}

render()