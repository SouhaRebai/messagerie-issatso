import React ,{useState} from 'react'
import { ChannelList , useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'
//components import 
import ChannelSearch from './ChannelSearch'
import TeamChannelList from './TeamChannelList'
import TeamChannelPreview from './TeamChannelPreview'
//import image
import ChatIcon from '../assets/chatapp.png'
import LogoutIcon from '../assets/logout.png'
//this compoent will constitute de sidebar of the app


const cookies = new Cookies()


const SideBar = ({logout}) => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
      <div className='icon1__inner'>
        <img src={ChatIcon} alt="Chat Icon" width='30' ></img>
      </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
      <div className='icon1__inner' onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width='30' ></img>
      </div>
    </div>
  </div>
)
const CompanyHeader = () =>(
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>Messagerie IssatSo</p>

  </div>
)
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging')
  
  
}


const ChannelListContent = ({isCreating,setCreateType,setIsCreating,setIsEditing ,setToggleContainer}) => {
  const { client } = useChatContext();
  const logout = () => { 
    //clear cookies + reload page to go back to the authentication page
    cookies.remove("token");
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
  }
  const filters = { members: { $in: [client.userID] } };
  return (
    <>
      <SideBar logout={logout}/>
      <div className='channel-list__list__wrapper'>
        <CompanyHeader/>
        <ChannelSearch setToggleContainer={setToggleContainer}/>
        <ChannelList
         filters = {filters}
         channelRenderFilterFn = {customChannelTeamFilter}
         List ={(listProps) => (
           <TeamChannelList
           { ...listProps}
           type="team"
           isCreating={isCreating}
           setIsCreating={setIsCreating}
           setCreateType={setCreateType}
           setIsEditing={setIsEditing}
           setToggleContainer={setToggleContainer}
           />
         )}
         Preview = { (previewProps) => (
           <TeamChannelPreview
           {...previewProps}
           setIsCreating={setIsCreating}
           setIsEditing={setIsEditing}
           setToggleContainer={setToggleContainer}
           type = "team"/>
         )}/>
          {/*channel list for direct messages  */}
         <ChannelList
         filters = {filters}
         channelRenderFilterFn = {customChannelMessagingFilter}
         List ={(listProps) => (
           <TeamChannelList
           { ...listProps}
           type="messaging"
           isCreating={isCreating}
           setIsCreating={setIsCreating}
           setCreateType={setCreateType}
           setIsEditing={setIsEditing}
           setToggleContainer={setToggleContainer}
           />
         )}
         Preview = { (previewProps) => (
           <TeamChannelPreview
           {...previewProps}
           setIsCreating={setIsCreating}
           setIsEditing={setIsEditing}
           setToggleContainer={setToggleContainer}
           type = "messaging"/>
         )}/>
      </div>
    </>
  )
}
const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
      <>
          <div className="channel-list__container">
            <ChannelListContent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing} 
            />
          </div>

          <div className="channel-list__container-responsive"
              style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
          >
              <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
              </div>
              <ChannelListContent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          </div>
      </>
  )

}
export default ChannelListContainer