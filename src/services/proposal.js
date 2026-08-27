const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/projectProposal`;

const create = async (proposalFormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proposalFormData),
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || data.message || 'failed to create')
        }
        return data
    } catch (error) {
        console.log(error)
        throw error
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
            throw new Error(data.error || data.message || 'failed to create')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

const show = async (projectProposalId) => {
    try {
        const res = await fetch(`${BASE_URL}/${projectProposalId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || data.message || 'failed to create')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

//for business owner, allow them to change info 
const update = async (projectProposalId, proposalFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${projectProposalId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proposalFormData)
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || data.message || 'failed to create')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

//for developers
const updateStatus = async (projectProposalId, proposalFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${projectProposalId}/status`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(proposalFormData)
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || data.message || 'failed to create')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

const deleteProposal = async (projectProposalId) => {
    try {
        const res = await fetch(`${BASE_URL}/${projectProposalId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.error || data.message || 'failed to create')
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

export {create, index, show, update, updateStatus, deleteProposal }