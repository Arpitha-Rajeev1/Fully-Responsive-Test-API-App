let methods = document.getElementById("methods")
let url = document.getElementById("url")
let send = document.getElementById("send")
let response = document.getElementById("response")
let jsonBody = document.getElementById("jsonBody")
let json = document.getElementById("json")
let params = document.getElementById("params")
let paramsList = document.getElementById("paramsList")
let valueList = document.getElementById("valueList")
let plus = document.getElementById("plus")
let allParams = document.getElementById("allParams")
let countParams = 0
let data

jsonBody.style.display = 'block'
allParams.style.display = 'none'

plus.addEventListener("click", () => {
    let html = `
    <input type="text" id="paramsList${countParams + 2}" placeholder="parameter" class="bg-[#00002c] border-b-2 w-[7rem] sm:w-[15rem] m-5 text-white hover:outline-none">

    <input type="text" id="valueList${countParams + 2}" placeholder="value" class="bg-[#00002c] border-b-2 w-[7rem] sm:w-[15rem] m-5 text-white hover:outline-none">

    <button class="minus border-2 text-white px-3 text-lg">-</button>
`
    let div = document.createElement('div');
    div.innerHTML = html
    allParams.appendChild(div)

    let minus = document.getElementsByClassName('minus')
    for (item of minus) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove()
        })
    }
    countParams++;
})

json.addEventListener("click", () => {
    jsonBody.style.display = 'block'
    allParams.style.display = 'none'
})

params.addEventListener("click", () => {
    jsonBody.firstElementChild.value = ""
    jsonBody.style.display = 'none'
    allParams.style.display = 'block'
})

send.addEventListener("click", () => {
    response.innerHTML = "Fetching response..."

    if (document.getElementById("requestJsonText").value != "") {
        data = document.getElementById("requestJsonText").value
    }
    else {
        data = {}
        for (let i = 0; i < countParams + 1; i++) {
            if (document.getElementById('paramsList' + (i + 1)) != undefined) {
                let key = document.getElementById('paramsList' + (i + 1)).value
                let value = document.getElementById('valueList' + (i + 1)).value
                data[key] = value
            }
        }
        data=JSON.stringify(data)
    }

    if (methods.value === 'GET') {
        fetch(url.value, {
            method: 'GET',
        })
            .then(res => res.text())
            .then((text) => {
                response.innerText = text
                Prism.highlightAll()
            })
    }
    else {
        fetch(url.value, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data,
        })
            .then((res) => res.text())
            .then((text) => {
                response.innerText = text
                console.log(text)
                Prism.highlightAll()
            });
    }
})