async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You", text, "user");
  input.value = "";

  const response = await fetch("/.netlify/functions/ask", {
    method: "POST",
    body: JSON.stringify({ question: text }),
  });

  const data = await response.json();
  addMessage("AI", data.answer, "bot");
}

function addMessage(sender, text, type) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = "message";

  msg.innerHTML = `<span class="${type}">${sender}:</span> ${text}`;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}
