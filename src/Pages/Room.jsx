import React, { useEffect, useState } from 'react'
import conf from '../conf/conf'
import { client, databases } from '../AppwriteConfig/AppwriteConfig'
import { ID } from '../AppwriteConfig/AppwriteConfig'
import { Query , Role,Permission} from 'appwrite'
import {Trash2} from 'react-feather'
import Header from '../Components/Header'
import { useAuth } from '../Context/AuthContext'

const Room = () => {

  const {user} = useAuth()

  useEffect(()=>{
      getMessages()

     const unsubscribe =  client.subscribe(`databases.${conf.appWrite_DatabaseID}.collections.${conf.appWrite_CollectionID}.documents`, response => {
          
          if (response.events.includes('databases.*.collections.*.documents.*.create')) {
            console.log('created')
            setMessages(prevState => [response.payload , ...prevState])
          }
          if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
            console.log('deleted')
            setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
          }
      })

      return () => {
        unsubscribe()
      }

  },[])

  const [messages,setMessages] = useState([])
  const [messageBody,setMessageBody] = useState('')

  const getMessages = async() => {
    const response  = await databases.listDocuments(
      conf.appWrite_DatabaseID,
      conf.appWrite_CollectionID,
      [
        Query.orderDesc('$createdAt')
      ]
    )
    setMessages(response.documents) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let payload = {
      User_ID: user.$id,
      UserName: user.name,
      body: messageBody
    }

    let permissions =[
          Permission.write(Role.user(user.$id))
    ]

    let response = await databases.createDocument(
      conf.appWrite_DatabaseID,
      conf.appWrite_CollectionID,
      ID.unique(),
      payload,
      permissions
    )
    // console.log(response)

    

    setMessageBody('')
  }

  const deleteMessage = async (message_id) => {
   await databases.deleteDocument(conf.appWrite_DatabaseID,conf.appWrite_CollectionID,message_id)
    
  }

  return (
    <main className='container'>
      <Header />
      <div className='room--container'>

        <form onSubmit={handleSubmit} id='message--form'>
            <div>
              <textarea 
                required
                maxLength="1000"
                placeholder='Type Here'
                onChange={(e) => {setMessageBody(e.target.value)}}
                value={messageBody}
              ></textarea>
            </div>

            <div className='send-btn--wrapper'>
              <input type="submit" value='send' className='btn btn--secondary' />
            </div>
        </form>

        <div>
          {messages.map(message => 
                <div key={message.$id} className='message--wrapper'>

                  <div className='message--header'>

                    <p>
                      {message?.UserName ? (
                        <span>{message.UserName}</span>
                      ):(
                        <span>Anonymus user</span>
                      )}

                      <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                    </p>

                   

                    {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                <Trash2 
                                className='delete--btn'
                                onClick={() => deleteMessage(message.$id)} />
                    )}
                    
                  </div>

                  <div className={"message--body" + (message.User_ID === user.$id ? ' message--body--owner' : '')}>
                    <span>{message.body}</span>
                  </div>

                </div>
              )}
        </div>
      </div>
    </main>
  )
}

export default Room
