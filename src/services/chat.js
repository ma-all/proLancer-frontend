const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/chat`

const create = async (chatData ) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chatData),
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}

const show = async (chatId) => {
    try {
        const res = await fetch(`${BASE_URL}/${chatId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}

const sendMessage = async (chatId, msg) => {
    try {
        const res = await fetch(`${BASE_URL}/${chatId}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({msg}),
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    index, show, sendMessage, create
}