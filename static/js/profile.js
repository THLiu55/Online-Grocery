function registerShop() {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/profile?type=register', true)
    xhr.setRequestHeader("X-CSRFToken", "{{ register_form.csrf_token._value() }}")
    let form = document.getElementById("shop-register-form")
    const fd = new FormData(form)
    xhr.send(fd)

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400) {
            alert(response.message)
        } else {
            location.reload()
        }
    }
}

function addNewProduct() {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/profile?type=newProduct', true)
    xhr.setRequestHeader("X-CSRFToken", "{{ register_form.csrf_token._value() }}")
    let form = document.getElementById("products-adding-form")
    const fd = new FormData(form)
    xhr.send(fd)

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400) {
            if (response.message === "Not a valid float value.") {
                alert("price must be a number")
            } else {
                alert(response.message)
            }
        } else {
            location.reload()
        }
    }
}

function removeProduct(id) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/profile?type=remove&id=' + id, true)
    xhr.send()

    xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        if (response.code === 400) {
            alert(response.message)
        } else {
            location.reload()
        }
    }
}