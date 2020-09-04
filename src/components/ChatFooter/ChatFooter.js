import React, { useState } from 'react';
import SubmitIcon from '../../assets/submit_icon.png'

import './ChatFooter.css';

const ChatFooter = ({ onSend }) => {
    const [message, setMessage] = useState('')

    const handleSubmitMessage = () => {
        message?.trim() && onSend(message)
        setMessage('')
    }

  return (
      <div className='chat-footer'>
          <input className='msg-input' value={message} autoFocus
                 onKeyUp={e => {
                    if(e.key === "Enter") {
                        handleSubmitMessage()
                    }}} 
                 onChange={(e) => setMessage(e?.target?.value)}/>
          <img className='submit-btn' src={SubmitIcon} alt='' onClick={handleSubmitMessage}/>
      </div>
  );
}

export default ChatFooter;
