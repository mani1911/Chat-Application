
const socket = io('http://localhost:9000')
const username = document.getElementById('name');
const nameButton = document.getElementById('name-btn');
const msgButton = document.getElementById('message-btn');
const message  = document.getElementById('message');

socket.on('connect', ()=>{
    console.log(socket.id);
});

nameButton.addEventListener("click", ()=>{
    socket.emit('username', username.value);
});
msgButton.addEventListener("click", ()=>{
    socket.emit('message', message.value);
    message.value = "";
    message.innerHTML = "";
});



