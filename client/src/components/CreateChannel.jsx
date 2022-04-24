import React , {useState} from 'react'
import {useChatContext} from 'stream-chat-react'
import {CloseCreateChannel} from '../assets'
import UserList from './UserList'
const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const handleChange = (event) => {
      event.preventDefault();

      setChannelName(event.target.value);
  }

  return (
      <div className="channel-name-input__wrapper">
          <p>Nom</p>
          <input value={channelName} onChange={handleChange} placeholder="nom-chaine" />
          <p>Ajouter des membres</p>
      </div>
  )
}

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID])
  const [channelName, setChannelName] = useState('');

  const createChannel = async (e) => {
    e.preventDefault();

    try {
        const newChannel = await client.channel(createType, channelName, {
            name: channelName, members: selectedUsers
        });

        await newChannel.watch();

        setChannelName('');
        setIsCreating(false);
        setSelectedUsers([client.userID]);
        setActiveChannel(newChannel);
    } catch (error) {
        console.log(error);
    }
}

return (
    <div className="create-channel__container">
        <div className="create-channel__header">
            <p>{createType === 'team' ? 'Créer une nouvelle chaine' : 'Envoyer un message direct'}</p>
            <CloseCreateChannel setIsCreating={setIsCreating} />
        </div>
        {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
        <UserList setSelectedUsers={setSelectedUsers} />
        <div className="create-channel__button-wrapper" onClick={createChannel}>
            <p>{createType === 'team' ? 'Créer une équipe' : 'Envoyer message'}</p>
        </div>
    </div>
)
}

export default CreateChannel
