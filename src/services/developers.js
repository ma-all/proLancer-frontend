const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/user`

const indexDev = async () => {
    try {
        const res = await fetch(`${BASE_URL}/developer`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        return res.json()
    } catch (error) {
        throw new Error(error)
    }
}

export {
    indexDev,
}