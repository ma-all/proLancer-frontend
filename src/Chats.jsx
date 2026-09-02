import { useState, useEffect } from 'react'
import socket from './socket'
import { useNavigate, useParams } from 'react-router'
import * as chatService from './services/chat'

const Chats = (props) => {

    const currentUserId = props.user?._id || props.user?.payload?._id || props.user?.id

    const navigate = useNavigate()

    const { chatId } = useParams()

    const [isConnected, setIsConnected] = useState(socket.connected)

    const [formData, setFormData] = useState('')

    const [messages, setMessages] = useState([])

    const [loading, setLoading] = useState(true)

    const [chat, setChat] = useState([])

    const [activeChat, setActiveChat] = useState(null)

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const chatData = await chatService.index()
                if (chatData)
                    setChat(chatData)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchChats()
    }, [])

    useEffect(() => {
        if (!chatId) {
            setActiveChat(null)
            setMessages([])
            return
        }

        const fetchChatDetails = async () => {
            try {
                const chatData = await chatService.show(chatId)
                setActiveChat(chatData)
                if (chatData?.messages) {
                    setMessages(chatData.messages)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchChatDetails()
    }, [chatId])

    useEffect(() => {
        if (!chatId)
            return
        const handleConnect = () => {
            setIsConnected(true)
            socket.emit('join_chat', chatId)
        }

        const handleDisconnect = () => {
            setIsConnected(false)
        }

        const handleChatMessage = (incomingData) => {
            const newMessage = incomingData.savedMessage || incomingData
            const senderId = newMessage.senderId?._id || newMessage.senderId
            if (String(senderId) !== String(currentUserId)) {
                setMessages((previousMessages) => {
                    return [...previousMessages, newMessage]
                })
            }
        }

        socket.on('connect', handleConnect)
        socket.on('disconnect', handleDisconnect)
        socket.on('chat message', handleChatMessage)
        if (!socket.connected) {
            socket.connect()
        } else {
            handleConnect()
        }

        return () => {
            socket.off('connect', handleConnect)
            socket.off('disconnect', handleDisconnect)
            socket.off('chat message', handleChatMessage)
        }
    }, [chatId, currentUserId])

    const handleChange = (event) => {
        setFormData(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const trimmedMsg = formData.trim()
        if (!trimmedMsg || !chatId)
            return
        try {
            const savedMessage = await chatService.sendMessage(chatId, trimmedMsg)
            if (savedMessage) {
                setMessages((prevMsgs) =>
                    [...prevMsgs, savedMessage])
                socket.emit('send_message', { chatId, savedMessage })
                setFormData('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const otherUser = (chatItem) => {
        const ownerId = chatItem.businessOwnerId?._id || chatItem.businessOwnerId || chatItem.businessOwner
        const isBusinessOwner = String(ownerId) === String(currentUserId)
        return isBusinessOwner ? chatItem.developerId : chatItem.businessOwnerId
    }

    if (loading) {
        return <p>Loading chats..</p>
    }

    return (
        <div className='chat-layout'>
            <div className='chat-sidebar'>
                <h1 className='sidebar-title'>Chats</h1>

                <div className='chat-list'>
                    {chat.length === 0 ? (

                        <p className='no-chats'>No chats yet.</p>
                    ) : (
                        chat.map((chatItem) => {
                            const anotherUser = otherUser(chatItem)
                            const isActive = chatItem._id === chatId
                            return (
                                <div key={chatItem._id} onClick={() => navigate(`/chat/${chatItem._id}`)}>
                                    <p className={`chat-user-name ${isActive ? 'active' : ''}`}>{anotherUser.username || 'Unknown User'}</p>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            <div className='chat-main'>

                {activeChat ? (
                    <>
                        <div className='chat-header'>
                            <center><h3>{otherUser(activeChat)?.username}</h3></center>
                        </div>

                        <div className='messages-container'>

                            {messages.length === 0 ? (
                                <center><p className='no-messages'>No messages yet</p></center>
                            ) : (

                                messages.map((message) => {
                                    const senderId = message.senderId?._id || message.senderId
                                    const myChat = String(senderId) === String(currentUserId)
                                    return (
                                        <div className={`message-bubble ${myChat ? 'outgoing' : 'incoming'}`} key={message._id}>
                                            <span className='sender-name'>
                                                {myChat ? 'You' : (message.senderId?.username || 'User')}
                                            </span>
                                            <p className='message-text'>{message.msg}</p>
                                        </div>
                                    )
                                })

                            )}
                        </div>

                        <form onSubmit={handleSubmit} className='chat-input-form'>
                            <input type='text' value={formData} onChange={handleChange} />
                            <button type='submit' disabled={!isConnected || !formData.trim()}> Send </button>
                        </form>
                    </>
                ) : (
                    <div className='no-active-chat'>
                        <p>Start a chat</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Chats