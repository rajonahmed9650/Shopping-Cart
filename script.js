fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        let contaniar = document.querySelector(".products-contanir");
        products.slice(0, 14).forEach(product => {
            let productdiv = document.createElement("div");
            productdiv.innerHTML = `
            <div>
                <h2 class = "title">${product.title}</h2>
                <div class = "img"><img src="${product.image}"></div>
                <i >${product.description.slice(0, 50)}</i>
            </div>
            <div class="btnpirce">
            <strong class = "price">price: $${product.price}</strong>
            <button class="btn btn-primary addtocard" ">Add to Cart</button> 
            </div>
            `;


            productdiv.setAttribute("class", "card")
            productdiv.classList.add("col-12", "col-sm-6", "col-md-3", "col-lg-3", "w-sm-25")


            contaniar.appendChild(productdiv);

            let addToCardButton = productdiv.querySelector(".addtocard");
            addToCardButton.addEventListener("click", function () {
                let img = productdiv.querySelector(".img img").src;
                let title = productdiv.querySelector(".title").innerText;
                let price = productdiv.querySelector(".price").innerText;
                cardAdd(img, title, price);
                SideBarShow()
                emtyText()
                let SubtotalShow = document.querySelector(".subtotal");
                SubtotalShow.classList.remove("d-none")
                SubtotalShow.classList.add("d-flex")
                
            })
        })
    })


function SideBarShow() {
    let SidBar = document.getElementsByClassName("SideBar")[0];


    if (SidBar) {
        SidBar.classList.remove("d-none")
    }

    let bodyelement = document.getElementsByClassName("content")[0];
    if (!bodyelement.classList.contains("blurred")) {
        bodyelement.classList.add("blurred")
    }



}

function SideBarHide() {
    let SidBar = document.getElementsByClassName("SideBar")[0];


    if (SidBar) {
        SidBar.classList.add("d-none")
    }

    let bodyelement = document.getElementsByClassName("content")[0];
    if (bodyelement.classList.contains("blurred")) {
        bodyelement.classList.remove("blurred")
    }
}


function cardAdd(img, title, price) {
    let cardList = document.getElementsByClassName("cardList")[0];

   
    let existingItem = document.getElementsByClassName("cart-item")
    let existingItemArray = [...existingItem].find(item=>
        item.querySelector("h6").innerText == title
    );

    if(!existingItemArray){
        let carItem = document.createElement("div");
        carItem.classList.add("cart-item", "d-flex", "justify-content-between","w-sm-25","w-md-50", "align-items-center", "gap-3", "mb-2")
        carItem.innerHTML = `
            <div class =" w-25 h-25  object-fit-contain d-flex justify-content-center align-items-center" style="height: 150px;"><img src="${img}" width=50/></div>
            <div class= "w-75">
                <h6>${title}</h6>
                <p class="cardItmePrice fs-6">${price}</P>
                <div class= "quaantityarea"><div class="quantiy"><button onclick="itemDecrement(event)">-</button><span class ="quantity">1</span><button class ="Increment"onclick="itemIncrement(event)">+</button></div> <button class ="removebtn"onclick="RemoveBtn(event)">Remove</button></div>
            </div>    
    
            `
        cardList.appendChild(carItem)
    }
    TotalAmount();  
}

function RemoveBtn(event) {
    let cardItem = event.target.closest(".cart-item"); 
    let cardList = document.querySelector(".cardList");


    let cardItmePrice = cardItem.querySelector(".cardItmePrice").innerText;
    
    let priceValue = parseFloat(cardItmePrice.replace("price: $", "").trim());
    let totalElement = document.getElementById("totalAmount");
    let total = parseFloat(totalElement.innerText.replace('$', '').trim());
    let newTotal = total - priceValue;
    totalElement.innerText = `$${newTotal.toFixed(2)}`;
    if (cardItem) {
        cardItem.remove();
    }
    let remainingItems = document.querySelectorAll(".cart-item");
    if (remainingItems.length === 0) {
        cardList.innerHTML = `
            <p class="emtyText alert alert-warning text-center fw-bold">Your cart is empty</p>
        `;
        let SubtotalShow = document.querySelector(".subtotal");
        SubtotalShow.classList.add("d-none");
    }
    
}


function emtyText() {
    let emtyString = document.getElementsByClassName("emtyText")[0];

    if (emtyString) {
        emtyString.remove();
    }

}

function TotalAmount(){
    let cartItems = document.querySelectorAll(".cart-item");
    let totalAmount = 0;

    cartItems.forEach(item => {
        let quantityElement = item.querySelector(".quantity");
        let priceElement = item.querySelector(".cardItmePrice");

        let quantityValue = parseInt(quantityElement.innerText);
        let priceValue = parseFloat(priceElement.innerText.replace("price: $", "").trim());

        totalAmount += (quantityValue * priceValue); 
    });

    document.getElementById("totalAmount").innerText = `$${totalAmount.toFixed(2)}`;
}







function itemIncrement(event){
    let clickedButton = event.target; 
    let cartItem = clickedButton.closest(".cart-item");  
    let quantityElement = cartItem.querySelector(".quantity");
    let priceElement = cartItem.querySelector(".cardItmePrice"); 

    if (quantityElement && priceElement) {
        let quantityValue = parseInt(quantityElement.innerText);
        let priceValue = parseFloat(priceElement.innerText.replace("price: $", "").trim());

        quantityValue += 1;
        quantityElement.innerText = quantityValue;
        TotalAmount();
    }
}


   

function itemDecrement(event){
    let clickedButton = event.target;
    let quantityElement = clickedButton.closest(".cart-item").querySelector(".quantity");
    
    if (quantityElement) {
        let quantityValue = parseInt(quantityElement.innerText);

        if (quantityValue > 1) { 
            quantityValue -= 1;
            quantityElement.innerText = quantityValue;
        }
        TotalAmount();
    }
}



function PromocodeDiscount() {
    let totalAmountElement = document.getElementById("totalAmount");  
    let totalAmount = parseFloat(totalAmountElement.innerText.replace("$", ""));
    let discount = 0;

    if (isNaN(totalAmount) || totalAmount <= 0) {  
        alert("Total amount is invalid!");
        return;
    }

    let Promocode = prompt("Enter Promo Code:");

    if (Promocode === "ostad10") {
        discount = (10 / 100) * totalAmount;
    } 
    else if (Promocode === "ostad5") {
        discount = (5 / 100) * totalAmount;
    } 
    else {
        alert("Invalid Promo Code!"); 
        return; 
    }

    let discountTotal = totalAmount - discount;
    totalAmountElement.innerText = `$${discountTotal.toFixed(2)}`; 

    alert(`Promo Code Applied! You saved $${discount.toFixed(2)}`);
}



