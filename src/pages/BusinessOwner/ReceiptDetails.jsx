import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import * as paymentService from '../../services/payments' 

const ReceiptDetails = (props) => {
    const navigate = useNavigate()
   
    const { proposalId, projectProposalId } = useParams()
    const currentId = proposalId || projectProposalId

    const [proposal, setProposal] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadReceiptData = async () => {
       
         const foundInProps = props.proposals?.find((pro) => pro._id === currentId)
            if (foundInProps) {
                setProposal(foundInProps)
                setLoading(false)
                return
            }
       try {
                if (paymentService.getReceipt) {
                    const data = await paymentService.getReceipt(currentId)
                    setProposal(data)
                }
            } catch (error) {
                console.error('Failed to load receipt:', error)
            } finally {
                setLoading(false)
            }
        }

        loadReceiptData()
    }, [currentId, props.proposals])

    if (loading) return <p>Loading Receipt...</p>
    if (!proposal) return <p>Receipt not found.</p>

    return (
        <div className='receipt-container'>
            <h2>Payment Receipt</h2>
            <hr />
            <p><strong>Proposal Title:</strong> {proposal.name}</p>
            <p><strong>Description:</strong> {proposal.description}</p>
            <p><strong>Amount Paid:</strong> BHD {proposal.budget}</p>
            <p><strong>Payment Status:</strong> {proposal.paymentStatus || 'Paid'}</p>
            
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default ReceiptDetails