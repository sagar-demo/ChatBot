const socket=io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message_area')
do{
   name= prompt('Please enter your name: ')

}while(!name)


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()

    }
    //append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrolltobotton()

    //send to server
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let minDiv=document.createElement('div')
    let classname=type
    minDiv.classList.add(classname,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    minDiv.innerHTML=markup
    messageArea.appendChild(minDiv)

}


//receive message
socket.on('message',(msg)=>{
    //console.log(msg)
    appendMessage(msg,'incoming')
    scrolltobotton()
})
function scrolltobotton(){
    messageArea.scrollTop=messageArea.scrollHeight
}