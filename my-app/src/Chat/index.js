import React, {
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import Presenter from "./Presenter";

const Chat = () => {
  const refMessage = useRef(null);
  const refTo = useRef(null);
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState("");
  const w = useMemo(
    () => new Worker(new URL("./socket.worker.js", import.meta.url)),
    []
  );

  useEffect(() => {
    if (user) return;
    const name = prompt("Ваше имя?");
    setUser(String(name));
    w.postMessage({ name });
  }, [user, w]);

  w.onmessage = useCallback(
    (e) => {
      const { userFrom, message } = e.data;
      if (userFrom && message) {
        setChat([...chat, `${userFrom}: ${message}`]);
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("Сообщение", {
              body: `Сообщение от ${userFrom}`,
            });
          }
        });
      }
    },
    [chat]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const message = refMessage.current.value;
      const userTo = refTo.current.value;
      w.postMessage({ message, userFrom: user, userTo });
      setChat([...chat, `Я: ${message}`]);
    },
    [chat, user, w]
  );

  return (
    <Presenter
      user={user}
      onSubmit={onSubmit}
      chat={chat}
      refTo={refTo}
      refMessage={refMessage}
    />
  );
};

export default Chat;
