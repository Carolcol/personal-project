var socket = io('http://localhost:8888');

socket.on('previousMessages', function (messages) {
    for (message of messages) {
        renderMessage(message)
    }
})

function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>' + message.author + '</strong>' + message.message + '</div>')
}

socket.on('receivedMessage', function (message) {
    renderMessage(message);
})


$('#chat').submit(function (event) {
    event.preventDefault();
    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author.length && message.length) {
        var messageObj = {
            author: author + ": ",
            message: message
        };

        socket.emit('sendMessage', messageObj)
    }

    renderMessage(messageObj);
})