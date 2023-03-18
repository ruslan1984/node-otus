import { memo } from "react";
import "./style.css";

const Presenter = ({ chat, onSubmit, refMessage, refTo, user }) => (
  <>
    <div className="chat">
      Чат ({user})
      <div className="messages">
        {chat.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
    <form className="form" onSubmit={onSubmit}>
      <input placeholder="message" ref={refMessage} />
      <input placeholder="to" ref={refTo} />
      <button> Отправить </button>
    </form>
  </>
);

export default memo(Presenter);
