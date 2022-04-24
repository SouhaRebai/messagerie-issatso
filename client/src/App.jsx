import React, { useState } from 'react'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import ChannelContainer from './components/ChannelContainer'
import ChannelListContainer from './components/ChannelListContainer'
import Auth from './components/Auth'
import './App.css'
import 'stream-chat-react/dist/css/index.css'
const apiKey = 'bgrf3kcwsmjd'
const cookies = new Cookies()
//we need to creat an istance of a stream chat 
const authToken = cookies.get("token")
//used to initialize the chat
const client = StreamChat.getInstance(apiKey)
if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

const App = () => {
  //we have to have the isCreating and isEditing inside of the channel list container 
  //thus the passing through the main app component
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  //now that we have our variables, we need to pass them as props
  
  if (!authToken) return <Auth/>
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
    {/* Will contain the channel container 
     and the channel list container*/}
     <ChannelListContainer
      isCreating={isCreating}
      setIsCreating={setIsCreating}
      setCreateType={setCreateType}
      setIsEditing={setIsEditing}
     />
    
     <ChannelContainer
      isCreating={isCreating}
      setIsCreating={setIsCreating}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      createType={createType}
       />
      </Chat>
    </div>
  )
}

export default App