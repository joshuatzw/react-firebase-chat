import {Link, useParams} from 'react-router-dom';
import { chatRooms } from '../../data/chatRooms';
import MessageInput from '../MessageInput/MessageInput';
import MessageList from '../MessageList/MessageList';
import './styles.css'


export default function ChatRoom() {
  
  const params = useParams();

  const room = chatRooms.find((x) => x.id === params.id);


  if (!room) {
    //TODO: 404
  }

  return(
    <>
      <h2> {room.title} </h2>
      <div>
        <Link to={"/"}> ⬅️ Back to all rooms </Link>
      </div>
      <div className='messages-container'>
        <MessageList roomId = {room.id} />
        <MessageInput roomId={room.id} />
      </div>
    </>
  )
}