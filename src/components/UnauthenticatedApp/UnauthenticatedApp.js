import { useAuth } from "../../hooks/useAuth";
import './styles.css';
import { AuthContext } from "../../context/auth";
import {useContext} from 'react'

export default function UnauthenticatedApp() {

  // const resource = useContext(AuthContext)
  const { login } = useAuth();

  return(
    <>
      <h2> Log in to join the chat room! </h2>
      <div>
        <button onClick={login} className="login"> 
          Login with Google 
        </button>
      </div>
    </>
  )
}