import React, { useState, useEffect, useRef } from 'react';
import useSessionStorage from '../../utils/useSessionStorage'
import { calculateMathExpression, BOT_MESSAGES } from '../../utils/chatUtils';
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatFooter from '../ChatFooter/ChatFooter';
import ChatContent from '../ChatContent/ChatContent';

import './Chat.css';

const useTimeoutMessages = (timeout = 500, initialValue = [], callback) => {
    const [preMessages, setPreMessages] = useState(initialValue)
    const messagesRef = useRef(preMessages)
    messagesRef.current = preMessages

    const setMessages = messages => 
        messages.map((message, i) => 
          
        setTimeout(() => {
           setPreMessages([...messagesRef.current, message])
           callback && callback(message)
          }, timeout * i)
        )

  
    return [preMessages, setMessages]
  }


const Chat = () => {
    const [name, setName] = useSessionStorage('name', '')
    const [isBot, setIsBot] = useState(true) 
    const [messages, setMessages] = useTimeoutMessages(500, [], ({ isUserInput })=> setIsBot(!!isUserInput))

   
    // At first render, we need to check if we already have a name in the session storage and show the correct messages
    useEffect(()=>{
        if (name) {
            setMessages([...BOT_MESSAGES.NICE_TO_SEE(name), ...BOT_MESSAGES.DESCRIBE_PROCESS()]) 
        }
        else {
            setMessages(BOT_MESSAGES.INTRO())
        }
    }, [])


    const sendMessageHandler = (newMessage) => {
        // We check if this is the user turn to give an input.
        // If we already have a name, we expect math expression. Otherwise, we expect a name and add the correct messages.
        if(!isBot){   
            setIsBot(true)
            if(!name){
                setName(newMessage)
                setMessages([ 
                            { message: newMessage, isUserInput: true },
                            ...BOT_MESSAGES.NICE_TO_MEET(newMessage), 
                            ...BOT_MESSAGES.DESCRIBE_PROCESS()])
            }
            else {
                setMessages([ 
                            { message: newMessage, isUserInput: true },
                            { message: calculateMathExpression(newMessage) }, 
                            ...BOT_MESSAGES.BOT_FEEDBACK()])
            }
       
           return
        }
        // Add user messages to the list even if it is not the user turn
        setMessages([{ message: newMessage, isUserInput: true }])
        
    }

  return (
    <div className="chat-container">
        <ChatHeader/>
        <ChatContent messages={messages}/>
        <ChatFooter onSend={sendMessageHandler}/>
    </div>
  );
}

export default Chat;
