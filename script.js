const socket=io('http://localhost:3000')
const messageForm=document.getElementById('send-container')
const messageContainer=document.getElementById('message-container')
const messageInput=document.getElementById('message-input')

const username=prompt("What is your name?")
appendmessage('You joined')
socket.emit('new-user',username)


socket.on('chat-message',data=>{
    appendmessage(`${data.username}:${data.message}`)
})

socket.on('user-connected',(username)=>{
    appendmessage(`${username} connected`)
    console.log(username)
})

socket.on('user-disconnected',(username)=>{
    appendmessage(`${username} disconnected`)
})

socket.on('user-message',username=>{
    appendmessage(`${username} connected` )
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault();
    const message=messageInput.value
    socket.emit('send-chat-message',message)
    messageInput.value=''
})

function appendmessage(message){
    const messageElement=document.createElement('div')
    messageElement.innerText=message
    messageContainer.append(messageElement)

}