const url = "ws://localhost:3001";

let socket = new WebSocket(url);

socket.addEventListener("open", function () {
  console.log("Соединение установлено.");
  /* eslint-disable-next-line no-restricted-globals */
  addEventListener("message", async (e) => {
    const { name, message, userFrom, userTo } = e.data;
    if (name) {
      socket.send(JSON.stringify({ newUser: name }));
    }
    if (message && userFrom && userTo) {
      socket.send(JSON.stringify({ message, userFrom, userTo }));
    }
  });
});

socket.addEventListener("message", (e) => {
  const { userFrom, message } = JSON.parse(e.data);
  postMessage({ userFrom, message });
});
