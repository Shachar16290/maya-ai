import React,  { useRef, useEffect }from 'react'
import cx from 'classnames'
import userPic from '../../assets/user_avatar.png'
import MayasPic from '../../assets/mayas_avatar.png'

import './ChatContent.css'

const ChatContent = ({ messages }) => {
  const scrollToRef = useRef(null)

  useEffect(() => {
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
  })

  return (
    <div className='chat-content'>
        {messages.map(({message, isUserInput}, i) =>
        <div className={cx('message-container', {'user-side': isUserInput}, {'bot-side': !isUserInput})} key={i}>
            <img className={cx('message-img', {'hidden' :messages[i+1]?.isUserInput === isUserInput && !!messages[i+1]})}  src={isUserInput ? userPic :MayasPic} alt=''/>
            <div className='message-content'>
                {message}
            </div> 
        </div>)}
        <div ref={scrollToRef} />
   </div>
  );
}

export default ChatContent
