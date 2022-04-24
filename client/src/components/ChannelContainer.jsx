import React from 'react'
import { Channel, MessageTeam } from 'stream-chat-react'
import ChannelInner from './ChannelInner'
import CreateChannel from './CreateChannel'
import EditChannel from './EditChannel'
//where the messsages are going to be displaye
//the input of sending messages

const ChannelContainer = ({ 
  isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {

 
  //get information about the current specific channel
  //We need to then know are we currently creating that channel and show a specific message on the dashboard for creating that channel 
  //We need to have a variable called isCreating and if we are we wil be returning a specific jsx block
  //we need the state isEditing 
  if(isCreating) {
    return (
        <div className="channel__container">
            <CreateChannel createType={createType} setIsCreating={setIsCreating} />
        </div>
    )
}
if(isEditing) {
  return (
      <div className="channel__container">
          <EditChannel setIsEditing={setIsEditing} />
      </div> 
  )
}
  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">Ceci est le debut de votre historique d'échange messages</p>
      <p className="channel-empty__second">Echangez des messages, ressources, liens , emojis et plus !</p>
      </div>
  )
  return (
    <div className="channel__container">
      <Channel
      EmptyStateIndicator={EmptyState}
      Message={(messageProps,i) =><MessageTeam key={i} {...messageProps}/>}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
      </div>
  );
}

export default ChannelContainer