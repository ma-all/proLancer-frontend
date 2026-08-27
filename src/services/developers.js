const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/user`

//do like this for the business owner

const indexDev = async () => {
    try {
        const res = await fetch(`${BASE_URL}/developer`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}

export {
    indexDev,
}