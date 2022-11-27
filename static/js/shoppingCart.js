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
        for (let i = 0; i < prev_shop_containers.length; i++) {
            prev_shop_containers[i].remove()
        }
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
                <div class="price-area">
                    Overall: 2200$
                </div>
            </div>`

            let itemContainer = newShopSpace.getElementsByTagName("ul")[0]
            let shop = shops[shopName];
            for (let itemNumber in shop) {
                let item = JSON.parse(shop[itemNumber])
                let address = `../static/product_img/${item.pic_address}`
                let newItem = document.createElement('li')
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
                                        <input type="number" id="number-of-items">
                                    </span>
                                    <span>
                                        $ ${item.cost}
                                    </span>
                                </div>
                                <div class="delete-btn-area">
                                    <button type="button" class="delete-btn" onclick="removeItem(${item.order_id})">Remove product</button>
                                </div>
                            </div>
                        </div>`
                itemContainer.appendChild(newItem)
            }

            shop_container.insertBefore(newShopSpace, total_cost_container)
        }

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