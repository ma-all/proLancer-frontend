import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import * as proposalService from '../../services/proposal'

const ProposalForm = (props) => {
    
    const navigate = useNavigate()

    const developerId = useParams()

    const initialState = {
        username: developerId,
        name: '',
        description: '',
        budget: '',
        features: '',
        theme: '',
        status: 'Pending',
    }

    const [developer, setDEveloper] = useState()
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = async (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newProposal = await proposalService(formData)
            setFormData(initialState)
            navigate('/projectProposal')
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            Website Name:
            <input type='text' name='name' onChange={handleChange} value={formData.name} required />

            Description:
            <input type='text' name='description' onChange={handleChange} value={formData.description} required />

            Budget:
            <input type='number' name='budget' onChange={handleChange} value={formData.budget} required />

            Features:
            <input type='text' name='features' onChange={handleChange} value={formData.features} required />

            Theme:
            <input type='text' name='theme' onChange={handleChange} value={formData.theme} required />

            <br />
            <button type='submit'>Submit</button>
            <button>Cancel</button>
        </form>
        </>
    )
}

export default ProposalForm