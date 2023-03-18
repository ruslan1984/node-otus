import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3001 });
const users = [];
wss.on("connection", function connection(client) {
  client.emit("message", { message: "welcome to the chat!" });
  client.on("message", async (data) => {
    const { newUser, message, userFrom, userTo } = JSON.parse(data.toString());

    if (newUser) {
      users.unshift({ id: client, user: newUser });
    }

    if (message && userFrom && userTo) {
      const findUser = users.find(
        (item) => String(item.user) === String(userTo)
      );
      if (findUser?.id) {
        findUser.id.send(
          JSON.stringify({
            message,
            userFrom,
          })
        );
      }
    }
  });
});
