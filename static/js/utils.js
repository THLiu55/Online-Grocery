// delay a second
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

// count Down for 30 seconds
async function countDown() {
    const num_div = document.getElementById('count')
    const sending_btn = document.getElementById('send_button')
    sending_btn.disabled = true
    sending_btn.style.backgroundColor = '#808080'
    for (let i = 30; i > 0; i--) {
        num_div.innerHTML = i.toString()
        await delay(1000)
    }
    sending_btn.disabled = false
    sending_btn.style.backgroundColor = '#5995fd'
    num_div.innerHTML = "SEND";
}