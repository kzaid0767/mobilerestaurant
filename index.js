import { menuArray } from "./data.js";
const paymentForm = document.getElementById('paymentform')
const thanksMessage = document.getElementById('thanks')
const ratingDiv = document.querySelector('#ratingDiv')
const offerBtn = document.getElementById("offerBtn")

let pizzaCount=0
let burgerCount=0
let friesCount=0
let mocktailCount=0
let total=0
let discountTotal = 0
let friesHtml=``
let mocktailHtml=``
let pizzaHtml =``
let burgerHtml=``



document.body.addEventListener('click', function(e){
    if(e.target.dataset.key){
        handleIncrement(e.target.dataset.key)
    } else if (e.target.dataset.rkey){
        handleRemove(e.target.dataset.rkey)
    } else if (e.target.dataset.pay){
        handlePay()
    } else if (e.target.dataset.reduce){
        handleReduce(e.target.dataset.reduce)
    }
    
})


paymentForm.addEventListener('submit',function(e){
    e.preventDefault()
    const paymentInfo = new FormData(paymentForm)
    document.getElementById('yourOrderDiv').style.display='none'
    thanksMessage.textContent=`Thanks, ${paymentInfo.get('name')}! Your order is on its way`
    thanksMessage.style.display='block'
    ratingDiv.style.display = 'block'
    paymentForm.style.display = 'none'
    paymentForm.reset() 
    pizzaCount=0
    burgerCount=0
    friesCount=0
    mocktailCount=0
    total=0
    friesHtml=``
    mocktailHtml=``
    pizzaHtml =``
    burgerHtml=``
})


function handleIncrement(id){
    thanksMessage.style.display='none' //closing if it previous open

    id=parseInt(id)
    const itemObj = menuArray.filter(item=>
        item.id === id)[0]    
    if(id===0){
        
        pizzaCount++
        pizzaHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*pizzaCount}</span>
        </div>
        `
        total +=itemObj.price
    } else if (id===1){
        burgerCount++
        burgerHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*burgerCount}</span>
        </div>
        `
        total +=itemObj.price
    } else if (id===2){
        friesCount++
        friesHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*friesCount}</span>
        </div>
        `
        total +=itemObj.price
    } else if (id===3){
        mocktailCount++
        mocktailHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*mocktailCount}</span>
        </div>
        `
        total +=itemObj.price
    }
    
    renderYourOrder()
}
function handleReduce(id){
    thanksMessage.style.display='none' //closing if it previous open
    id=parseInt(id)
    const itemObj = menuArray.filter(item=>
        item.id === id)[0]    
    if(id===0 && pizzaCount>0){
        
        pizzaCount--
        pizzaHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*pizzaCount}</span>
        </div>
        `
        if(pizzaCount>=0){
            total -=itemObj.price
            if(total<0){
                total=0
            }
        }
        
    } else if (id===1 && burgerCount>0){
        burgerCount--
        burgerHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*burgerCount}</span>
        </div>
        `
        if(burgerCount>=0){
            total -=itemObj.price
            if(total<0){
                total=0
            }
        }
    } else if (id===2&& friesCount>0){
        friesCount--
        friesHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*friesCount}</span>
        </div>
        `
        if(friesCount>=0){
            total -=itemObj.price
            if(total<0){
                total=0
            }
        }
    } else if (id===3 && mocktailCount>0){
        mocktailCount--
        mocktailHtml = `
        <div class="listedItems">
            <span class="eachItem-details name">${itemObj.name} <span class="eachItem-details ingredients remove" data-rkey="${id}">remove</span></span> 
            <span>$${itemObj.price*mocktailCount}</span>
        </div>
        `
        if(mocktailCount>=0){
            total -=itemObj.price
            if(total<0){
                total=0
            }
        }
    }
    
    renderYourOrder()
}

function handleRemove(id){
    id=parseInt(id)
    const itemObj = menuArray.filter(item=>
        item.id === id)[0] 
    if(id===0){
        total -= itemObj.price*pizzaCount
        pizzaCount=0
        pizzaHtml=``
    
    } else if (id===1){
        total -= itemObj.price*burgerCount
        burgerCount=0
        burgerHtml=``
    
    } else if (id===2){
        total -= itemObj.price*friesCount
        friesCount=0
        friesHtml=``
    
    } else if (id===3){
        total -= itemObj.price*mocktailCount
        mocktailCount=0
        mocktailHtml=``
    
    }
    renderYourOrder()
}

function handlePay(){
    paymentForm.style.display='block'
}

ratingDiv.addEventListener('click', function (e) {
    const targetId = e.target.id
    const star1 = document.getElementById('star1')
    const star2 = document.getElementById('star2')
    const star3 = document.getElementById('star3')
    const star4 = document.getElementById('star4')
    const star5 = document.getElementById('star5')
    if(targetId==='star1'){
        star1.classList.toggle('ratingColor')
    } else if (targetId==='star2'){
        star2.classList.toggle('ratingColor')
    } else if (targetId==='star3'){
        star3.classList.toggle('ratingColor')
    } else if (targetId==='star4'){
        star4.classList.toggle('ratingColor')
    } else if (targetId==='star5'){
        star5.classList.toggle('ratingColor')
    } else if(targetId==='ratingBtn'){
        ratingDiv.style.display='none'
        document.getElementById('offerDiv').style.display='block'
    }
    
})

offerBtn.addEventListener('click',()=>{
    document.getElementById('offerDiv').style.display='none'
})

function renderYourOrder(){
    total>0?document.getElementById('yourOrderDiv').style.display='block':document.getElementById('yourOrderDiv').style.display='none'
    total>=30?discountTotal = (total*0.9).toFixed(2): discountTotal= total
    let orderHtml=``
    orderHtml = `<div class="listedItems">
    <span class="eachItem-details name">Discounted price:</span><span>$${discountTotal}</span>
    <span class="eachItem-details name">Total price:</span><span>$${total}</span>
    </div>`
    document.getElementById('toCheckOut').innerHTML = pizzaHtml+burgerHtml+friesHtml+mocktailHtml
    document.getElementById('total').innerHTML = orderHtml
   
}

function getHTML(){
    let feedHtml = ``

    menuArray.forEach(item=>
        feedHtml += `
        <div class="eachItem">
            <img src="${item.emoji}" class="emoji" alt="${item.name}">
            <div class="item-text">
                <h1 class="eachItem-details name">${item.name}</h1>
                <p class="eachItem-details ingredients">${item.ingredients}</p>
                <h3 class="eachItem-details price">$${item.price}</h3>
            </div>
            <div>
            <div class="regular" data-key="${item.id}" >+</div>
            <div class="regular" data-reduce="${item.id}" >-</div>
            </div>
        </div>    
        `)

    return feedHtml

}

function render(){
    document.querySelector('#items').innerHTML = getHTML()
}

setInterval( () => { 
    const blinker = document.getElementById('blinker')
    blinker.style.visibility = (blinker.style.visibility == 'hidden' ? ''
  : 'hidden')}, 750)

render()