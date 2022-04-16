
const socket = io('http://localhost:9000')
const username = document.getElementById('name');
const nameButton = document.getElementById('name-btn');
const msgButton = document.getElementById('message-btn');
const message  = document.getElementById('message');
const userCount = document.getElementById('userCount');
const main = document.getElementById('main');




nameButton.addEventListener("click", ()=>{
    socket.emit('username', username.value);
});

msgButton.addEventListener("click", ()=>{
    socket.emit('message', message.value);
    let para = document.createElement("p");
    para.classList.add('current-user');
    para.innerHTML = `${message.value}`;
    main.appendChild(para);
    message.value = "";
});

socket.on('userCount', data=>{
    userCount.innerHTML = `Users : ${data}`;
    console.log(data);
})
socket.on('userCount1', data=>{
    userCount.innerHTML = `Users : ${data}`;
    console.log(data);
})

socket.on('server-message', (msg,username)=>{
    let para = document.createElement("p");
    para.innerHTML = `${username} : ${msg}`;
    para.classList.add('other-user');
    main.appendChild(para);
    console.log(msg);
});












