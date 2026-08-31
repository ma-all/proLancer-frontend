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

    // useEffect(() => {
    //     const fetchChat = async () => {
    //         if (!chatId)
    //             // setLoading(false)
    //             return
    //         try {
    //             setLoading(true)
    //             const chatData = await chatService.show(chatId)
    //             if (chatData && chatData.messages) {
    //                 setMessages(chatData.messages)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    //     fetchChat()
    // }, [chatId])

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
            // console.log('Leaving chat and closing socket')
            socket.off('connect', handleConnect)
            socket.off('disconnect', handleDisconnect)
            socket.off('chat message', handleChatMessage)
            // socket.disconnect()
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
        // const messageData = {
        //     username: props.user.username,
        //     text: formData.trim(),
        // }
        // socket.emit('chat message', messageData)
        // setFormData('')
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
        <>
            <h1>Chats</h1>

            {/* <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p> */}

            <section>
                {/* {messages.length === 0 && (
                    <p>No messages yet. Start the conversation!</p>
                )} */}

                <div>
                    {chat.length === 0 ? (
                        <p>No chats yet.</p>
                    ) : (
                        chat.map((chat) => {
                            const anotherUser = otherUser(chat)
                            return (
                                <div key={chat._id} onClick={() => navigate(`/chat/${chat._id}`)}>
                                    <p>{anotherUser?.username || 'Unknown User'}</p>
                                </div>
                            )
                        })
                    )}
                </div>

                {activeChat ? (
                    <>
                        <h3>{otherUser(activeChat)?.username}</h3>

                        {messages.length === 0 ? (
                            <p>No messages yet</p>
                        ) : (

                            messages.map((message) => {
                                const senderId = message.senderId?._id || message.senderId
                                const myChat = String(senderId) === String(currentUserId)
                                return (
                                    <div key={message._id}>
                                        <span>
                                            {myChat ? 'You' : (message.senderId?.username || 'User')}
                                        </span>
                                        <p>{message.msg}</p>
                                    </div>
                                )
                            })

                        )}

                        <form onSubmit={handleSubmit}>
                            <input type='text' value={formData} onChange={handleChange} />
                            <button type='submit' disabled={!isConnected || !formData.trim()}> Send </button>
                        </form>
                    </>
                ) : (
                    <p>Start a chat</p>
                )}
            </section>
        </>
    )
}

export default Chats