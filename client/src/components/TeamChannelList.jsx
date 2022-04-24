import React from 'react'
import {AddChannel} from '../assets'

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  if (error) {
    return type ==='team' ? (
    <div className='team-channel-list'>
      <p className='team-channel-list__message'>
        Connxion interrompue, vueillez éssayer plus tard ...
      </p>
      </div>
    ) : null
  }
  if (loading) {
    return (
      <div className='team-channel-list'>
      <p className='team-channel-list__message loading'>
        {type === 'team' ? 'Chaines' : 'Messages'} en cours de chargement ...
      </p>
    </div>
    )
  }
  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
        {type === 'team' ? 'Discussions privées' : 'Messages directes'}
        </p>
        <AddChannel
        isCreating={isCreating}
        setCreateType={setCreateType}
        setIsCreating={setIsCreating}
        setIsEditing={setIsEditing}
        setToggleContainer={setToggleContainer}
        type ={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList