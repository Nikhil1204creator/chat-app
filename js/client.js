const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('forms-data');
const msgInput = document.getElementById('msg-input');
const msgContainer = document.querySelector('.container');

const append = (message, position) => {
    console.log("message", message)
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add(position);
    msgContainer.append(messageElement);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})