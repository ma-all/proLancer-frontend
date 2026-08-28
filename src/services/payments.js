const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/payment`

const create = async (projectProposalId) => {
    try {
        const res = await fetch(`${BASE_URL}/createPayment`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectProposalId)
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || 'Payment failed')
        }
        return data
    } catch (error) {
        throw new Error(data.error)
    }
}

export {
    create,
}