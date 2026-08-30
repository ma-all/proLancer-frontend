const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/chat`

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
        console.log(error)
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
        console.log(error)
    }
}

export {
    index, show,
}