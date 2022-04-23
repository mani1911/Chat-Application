
const socket = io('http://localhost:9000')
const msgButton = document.getElementById('message-btn');
const message  = document.getElementById('message');
const userCount = document.getElementById('userCount');
const main = document.getElementById('main');
const logoutBtn = document.getElementById('logout');

msgButton.addEventListener("click", ()=>{
    socket.emit('message', message.value);
    let para = document.createElement("p");
    para.classList.add('current-user');
    para.innerHTML = `${message.value}`;
    main.appendChild(para);
    message.value = "";
});

logoutBtn.addEventListener('click', ()=>{
    socket.disconnect();
    
})



socket.on('userCount', data=>{
    userCount.innerHTML = `Users : ${data}`;

})
socket.on('userCount1', data=>{
    userCount.innerHTML = `Users : ${data}`;
})

socket.on('server-message', (msg,username)=>{
    let para = document.createElement("p");
    para.innerHTML = `${username} : ${msg}`;
    para.classList.add('other-user');
    main.appendChild(para);
    console.log(msg);
});

socket.on('reducedUserCount', data=>{
    userCount.innerHTML = `Users : ${data-1}`;
})















