//Constantes
const books = [
    
    {
        book: 'eth_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    
    {
        book: 'sol_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    
    {
        book: 'btc_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'aave_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'xrp_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'ltc_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'ape_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'comp_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'link_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    },
    {
        book: 'ada_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    }
    ,{
        book: 'uni_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    }
    ,{
        book: 'mana_usd',
        last_price: 0,
        current_price: 0,
        max_price: 0,
        min_price: 0,
        operaciones: 0
    }
]

$(() => {
    createBooks();
    let websocket = new WebSocket('wss://ws.bitso.com');
    websocket.onopen = () => {
        openSocket(websocket);
    }
    websocket.onmessage = (message) => {
        messageSocket(websocket, message)
    }
    websocket.onclose = (e) => {
        alert('Connection Close ' + JSON.stringify(e),'danger');
    }
});

function createBooks() {
    let container = $('.content');

    books.forEach((item) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="card m-1" style="width: 18rem; float:left;">`,
            `   <div class="card-body">`,
            `       <h5 class="card-title">${item.book}</h5>`,
            //`       <h6 class="card-subtitle mb-2 text-muted">${item.book}</h6>`,
            `       <div class="card-text" data-id="${item.book}">&nbsp;</div>`,
            `   </div>`,
            '</div>'
        ].join('')
        container.append($(wrapper));
    });

}

function verifyConnection(websocket) {

}

function openSocket(websocket) {
    //Suscribe to books
    if (websocket) {
        books.forEach((item) => {
            websocket.send(JSON.stringify({
                action: 'subscribe',
                book: item.book,
                type: 'trades'
            }));
        });

    }
}



function messageSocket(websocket, message) {
    let data = JSON.parse(message.data);

    if (data.action && data.action == 'subscribe') {
        alert('Connection success', 'success');
    }

    if (data.type == 'ka') {
        $('#mensaje').css({
            'color': '#' + Math.floor(Math.random() * 16777215).toString(16)
        })
    }

    if (data.type == 'trades' && data.payload) {
        newTrade(data);
    }

}

function newTrade(data) {

    const element = document.querySelector(`[data-id="${data.book}"]`);
    let book = books.find((item) => item.book == data.book);
    let playUp = false;
    let playDown = false;
    book.last_price = book.current_price;
    book.current_price = data.payload[0].r;
    book.operaciones = book.operaciones + 1;

    //book.max_price = book.current_price > book.max_price ? book.current_price : book.max_price;
    if (book.current_price > book.max_price) {
        book.max_price = book.current_price;
        playUp = true;
        playsound('up');
    }

    if (book.current_price < book.min_price) {
        book.min_price = book.current_price;
        playDown = true;
        playsound('down');
    } else {
        if (book.min_price <= 0) {
            book.min_price = book.current_price;
        }
    }


    const template = [
        `<div>`,
        `   <table class="table">`,
        `       <tr>`,
        `           <td>`,
        `               Precio Max:`,
        `           </td>`,
        `           <td class="${ playUp ? 'text-warning' : ''}">`,
        `               $${book.max_price}`,
        `           </td>`,
        `       </tr>`,
        `       <tr>`,
        `           <td>`,
        `               Precio Min:`,
        `           </td>`,
        `           <td class="${ playDown ? 'text-warning' : ''}">`,
        `               $${book.min_price}`,
        `           </td>`,
        `       </tr>`,
        `       <tr>`,
        `           <td>`,
        `               Precio anterior:`,
        `           </td>`,
        `           <td>`,
        `               $${book.last_price}`,
        `           </td>`,
        `       </tr>`,
        `       <tr>`,
        `           <td>`,
        `               Precio actual:`,
        `           </td>`,
        `           <td>`,
        `               <a href="#">$${book.current_price}</a>`,
        `           </td>`,
        `       </tr>`,
        `       <tr>`,
        `           <td>`,
        `               Diferencia:`,
        `           </td>`,
        `           <td class="${(book.current_price - book.last_price) < 0 ? 'text-danger':'text-success'}">`,
        `               $${(book.current_price - book.last_price).toFixed(4)}`,
        `           </td>`,
        `       </tr>`,
        `       <tr>`,
        `           <td>`,
        `               Operaciones:`,
        `           </td>`,
        `           <td>`,
        `               ${book.operaciones}`,
        `           </td>`,
        `       </tr>`,
        `   </table>`,
        `</div>`,
    ].join('')
    $(element).html(template);
}

function playsound(type) {
    let x ;
    if(type == 'up'){
        x = document.getElementById("audio1");
    }else if (type == 'down') {
        x = document.getElementById("audio2");
    }else{
        return;
    }
    
    //$(x).attr('src', `http://127.0.0.1:3000/static/cryptoapp/audio/n${ type == 'up' ? '1':'2' }.mp3`);
    
    x.play();
    return;
    var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createBufferSource();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/static/socketsapp/audio.mp3');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function (r) {
        audioCtx.decodeAudioData(
            xhr.response,
            function (buffer) {
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                source.loop = false;
            });
        source.start(0);
    });
    xhr.send();
}


const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        //`   <div id="mensaje">${message}</div>`,
        `   <div id="mensaje">${message}`,
        `       <audio controls id="audio1">`,
        `           <source src="http://127.0.0.1:3000/static/cryptoapp/audio/n1.mp3" type="audio/mpeg">`,
        `       </audio>`,
        `       <audio controls id="audio2">`,
        `           <source src="http://127.0.0.1:3000/static/cryptoapp/audio/n2.mp3" type="audio/mpeg">`,
        `       </audio>`,
        `   </div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    $('.alerta').html(wrapper);
}