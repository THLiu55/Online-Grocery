const shop_container = document.getElementById("shop-container")
const total_cost_container = document.getElementById("total-cost")
loadCart()

function loadCart() {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/user/shopping-bag?type=load', true)
    xhr.send()

    xhr.onload = function() {
        let response = JSON.parse(xhr.responseText)
        let prev_shop_containers = shop_container.getElementsByClassName("shopping-cart-item-frame")
        let container_len = prev_shop_containers.length
        for (let i = 0; i < container_len; i++) {
            prev_shop_containers[0].remove()
        }
        let total = 0;
        let shops = JSON.parse(response.message)
        for (let shopName in shops) {
            let newShopSpace = document.createElement('div')
            newShopSpace.className = "shopping-cart-item-frame"
            newShopSpace.innerHTML =  `<div class="shop-info-header">
                <a class="entrance-to-shop">${shopName}</a>
            </div>
            <!-- product items in shop card frame -->
            <div class="item-frame">
                <ul class="cart-products-list">
                    
                </ul>
            </div>

            <div class="overall-frame">
                <div class="price-area" id="price-per-shop">
                    <strong></strong>
                </div>
            </div>`

            let itemContainer = newShopSpace.getElementsByTagName("ul")[0]

            let shop = shops[shopName];
            let shopTotalCost = 0;
            for (let itemNumber in shop) {
                let item = JSON.parse(shop[itemNumber])
                let address = `../static/product_img/${item.pic_address}`
                let newItem = document.createElement('li')
                let item_cost = item.unit_price * item.amount;
                shopTotalCost += item_cost;
                newItem.className = 'cart-product-item'
                newItem.innerHTML = `<div class="cart-product-pic-frame">
                            <img class="cart-product-pic-frame" src=${address}/>
                        </div>
                        <div class="cart-product-info-frame">
                            <div class="cart-products-flex-box">
                                <h3>${item.name}</h3>
                                <div class="cart-product-description">
                                    ${item.description}
                                </div>
                                <div class="cart-product-unit-price">
                                    <span>
                                        <button type="button" id="number-add" onclick="addAmount(${item.order_id})"> + </button>
                                    </span>
                                    <span>
                                        <input type="text" id="number-of-items" value="${item.amount}" readonly>
                                    </span>
                                    <span>
                                        <button type="button" id="number-decrease" onclick="reduceAmount(${item.order_id})"> - </button>
                                    </span>
                                    <span>
                                        $ ${item_cost}
                                    </span>
                                </div>
                                <div class="delete-btn-area">
                                    <button type="button" class="delete-btn" onclick="removeItem(${item.order_id})">Remove product</button>
                                </div>
                            </div>
                        </div>`
                itemContainer.appendChild(newItem)
            }
            total += shopTotalCost

            let shopTotalCostContainer = newShopSpace.getElementsByTagName('strong')[0]
            shopTotalCostContainer.innerHTML = `Overall: ${shopTotalCost}$`
            console.log(`insert ${newShopSpace}`)
            shop_container.insertBefore(newShopSpace, total_cost_container)
        }

        document.getElementById('total').innerHTML = `Total Overall: ${total}$`

    }
}

function removeItem(order_id) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET',`/user/shopping-bag?type=remove&id=${order_id}`, true)
    xhr.send()

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 200) {
            loadCart()
        } else {
            alert("Something goes wrong, please try again")
        }
    }
}

function addAmount(order_id) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET',`/user/shopping-bag?type=addAmount&id=${order_id}`, true)
    xhr.send()

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 200) {
            loadCart()
        } else {
            alert("Something goes wrong, please try again")
        }
    }
}

function reduceAmount(order_id) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET',`/user/shopping-bag?type=reduceAmount&id=${order_id}`, true)
    xhr.send()

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 200) {
            loadCart();
        } else {
            alert(response.message)
        }
    }
}