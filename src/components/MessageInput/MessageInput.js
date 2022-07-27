import './styles.css'
import React, {useState} from 'react';
import {useAuth} from '../../hooks/useAuth'
import { sendMessage } from '../../services/firebase';

export default function MessageInput({roomId}) {
  const { user } = useAuth();
  const [value, setValue] = useState('')

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(roomId, user, value);
    setValue('')
  }

  return(
    <form onSubmit={handleSubmit} className="message-input-container">
      <input 
        type="text"
        placeholder="Enter a message"
        value={value}
        onChange={handleChange}
        className="message-input"
        required
        minLength={1}
        />
      <button type="submit" disabled={value.length < 1} className="send-message">
        Send
      </button>
    </form>
  )
}