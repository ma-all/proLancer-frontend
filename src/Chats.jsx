import { useState, useEffect } from 'react'
import socket from './socket'
import { useParams } from 'react-router'
import * as chatService from './services/chat'

const Chats = (props) => {

    const currentUserId = props.user?._id || props.user?.payload?._id

    const { chatId } = useParams()

    const [isConnected, setIsConnected] = useState(socket.connected)

    const [formData, setFormData] = useState('')

    const [messages, setMessages] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchChat = async () => {
            if (!chatId)
                return
            try {
                setLoading(true)
                const chatData = await chatService.show(chatId)
                if (chatData && chatData.messages) {
                    setMessages(chatData.messages)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchChat()
    }, [chatId])

    useEffect(() => {
        const handleConnect = () => {
            setIsConnected(true)
            socket.emit('join_chat', chatId)
        }

        const handleDisconnect = () => {
            setIsConnected(false)
        }

        const handleChatMessage = (newMessage) => {
            const senderId = newMessage.senderId?._id
            if (senderId !== currentUserId) {
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
            socket.disconnect()
        }
    }, [chatId, currentUserId])

    const handleChange = (event) => {
        setFormData(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const trimmedMsg = formData.trim()
        if (!formData)
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

    if (loading) {
        return <p>Loading chats..</p>
    }

    return (
        <>
            <h1>Chats</h1>

            {/* <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p> */}

            <section>
                <h2>Messages</h2>
                {messages.length === 0 && (
                    <p>No messages yet. Start the conversation!</p>
                )}

                {messages.map((message) => {
                    const senderId = message.senderId?._id || message.senderId
                    const myChat = senderId === currentUserId
                    return (
                        <div key={message._id}>
                            <span>
                                {myChat ? 'You' : (message.senderId?.username || 'User')}
                            </span>
                            <div>{message.msg}</div>
                        </div>
                    )
                    // <article>
                    //     <h3>{message.username}</h3>
                    //     <p>{message.text}</p>
                    // </article>
                })}
            </section>

            <form onSubmit={handleSubmit}>
                {/* Message: */}
                <input type='text' name='message' value={formData} onChange={handleChange} />
                <button type='submit' disabled={!isConnected || !formData.trim()}>Send</button>
            </form>
        </>
    )
}

export default Chats