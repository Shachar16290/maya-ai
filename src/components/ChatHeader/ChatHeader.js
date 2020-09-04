import React from 'react';
import './ChatHeader.css';
import MayasPic from '../../assets/mayas_avatar.png'

const ChatHeader = props => {
  return (
      <div className='chat-header'>
          <img className='bot-img' src={MayasPic} alt=''/>
          <div className='bot-details'>
              <div className='bot-name'>Maya</div>
              <span className='online-indication'/>
              <span className='online-text'>Online</span>
          </div>
      </div>
  );
}

export default ChatHeader;
