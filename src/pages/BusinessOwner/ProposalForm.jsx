import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import * as proposalService from '../../services/proposal'

const ProposalForm = (props) => {

    const navigate = useNavigate()

    const location = useLocation()

    const { developerId } = useParams()

    const selectDevId = location.state?.targetDeveloperId || developerId || ''

    const initialState = {
        developer: developerId || '',
        name: '',
        description: '',
        budget: '',
        features: '',
        theme: '',
        status: 'Pending',
    }


    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (selectDevId) {
            setFormData((prev) => ({
                ...prev, 
                developer: selectDevId
            }))
        }
    }, [selectDevId])

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!formData.developer) {
            setMessage('Please select a developer.')
            return
        }
        try {
            const payload = {
                ...formData,
                budget: Number(formData.budget)
            }
            const newProposal = await proposalService.create(payload)
            if (props.setProposals){
                props.setProposals((prev) => 
                [...prev, newProposal])
            }
            setFormData(initialState)
            navigate('/projectProposal')
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='proposal-form-container'>
                <div className='proposal-form-card'>
                    <h2>New Project Proposal</h2>
                    <hr />
                    <div className='proposal-form'>
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
                        <div className='proposal-form-two-buttons'>
                            <button type='submit' className='proposal-form-button'>Submit</button>
                            <button onClick={() => navigate('/')} className='proposal-form-button'>Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProposalForm