function sendMessage() {
    var userInput = document.getElementById('userInput').value;
    var chatMessages = document.getElementById('chatMessages');

    var messageItem = document.createElement('li');
    messageItem.className = 'message user-message';
    messageItem.textContent = userInput;

    chatMessages.appendChild(messageItem);

    document.getElementById('userInput').value = '';
}