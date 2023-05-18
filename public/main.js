const socket = io()
const chatMessages = document.querySelector(".chat-messages")

// message from server
socket.on("message", (message) => {
    console.log(message);

    // outputMessage(message)

    if (message) {
        outputMessage(message)
    }

    // Scroll down when there is a new message
    chatMessages.scrollTop = chatMessages.scrollHeight


})

const myForm = document.getElementById("myForm")
myForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get the typed in value: "msg" comes from the elements id
    const msg = e.target.elements.msg.value
    console.log(msg)

    // Emit the message payload to the server
    socket.emit("chatMessage", msg)

    // Clear textfield
    e.target.elements.msg.value = ""
    // focus cursor
    e.target.elements.msg.value.fucus()



})

// Output message to the DOM
function outputMessage(message) {
    const div = document.createElement("div")
    div.classList.add("chat-reply")
    div.innerHTML = ` <p> ${message} </p>`
    document.querySelector(".chat-messages").appendChild(div)

}




