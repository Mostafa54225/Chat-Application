import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './chat.css'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({socket, username, roomName}) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== "") {
            const messageData = {
                roomName, username, message: currentMessage, 
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socket.on("receive_message", (message) => {
            setMessageList((list) => [...list, message])
        })
    }, [socket])

  return (


    <section className="chatbox">
		<section className="chat-window">
            <ScrollToBottom className='message-container'>
                {messageList.map((messageContent, i) => {
                    return <article key={i} className="msg-container" id={messageContent.username === username ? "msg-self": "msg-remote"}>
                    <div className="msg-box">
                        <div className="flr">
                            <div className="messages">
                                <p className="msg" id="msg-0">
                                    {messageContent.message}
                                </p>
                            </div>
                            <span className="timestamp"><span className="username">{messageContent.username}</span>&bull;<span className="posttime">{messageContent.time}</span></span>
                        </div>
                    </div>
                </article>
                })}
            </ScrollToBottom>

		</section>
        <div className='chat-input'>
        <input type="text" autoComplete='on' value={currentMessage} placeholder="Type a message" onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={(e) => {
            e.key === "Enter" && sendMessage()
        }}
        />
			<button onClick={sendMessage}>
            <svg viewBox="0 0 24 24"><path fill="rgba(0,0,0,.38)" d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>
            </button>
        </div>

	</section>

        
  )
}

export default Chat