import React, { useEffect, useMemo, useState, useRef } from "react";
import io from "socket.io-client";
// import { io } from "socket.io-client";

function App() {
  const ENDPOINT = "http://localhost:3001";
  const ref = useRef(null);
  const [chat, setChat] = useState([]);
  // const [s, setS] = useState(0);
  const socket = io(ENDPOINT);
  // // useEffect(() => {
  // // socket.on("FromAPI", (data) => {
  console.log("render");
  // // });
  socket.on("connect", (data) => {
    // const name = prompt("Ваше имя?");
    // socket.emit("message", { name });
    console.log(data);
    setChat([...chat, data?.message]);
  });
  socket.on("message", (data) => {
    console.log(data);
  });

  // // }, [socket]);

  const onSubmit = (e) => {
    e.preventDefault();
    // alert(ref.current.value);
    socket.send(ref.current.value);
  };
  return (
    <>
      <div>
        Чат
        <div>
          {chat.map((item) => (
            <div>{item}</div>
          ))}
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <input ref={ref} />
        <button> Отправить </button>
      </form>
    </>
  );
}

export default App;
