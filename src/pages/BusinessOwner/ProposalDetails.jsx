import { useNavigate, useParams } from 'react-router'
import * as paymentService from '../../services/payments'
import { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const ProposalDetails = (props) => {

    const { projectProposalId } = useParams()

    const [clientSecret, setClientSecret] = useState('')

    const [showPayment, setShowPayment] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')

    const proposal = props.proposals?.find((pro) =>
        pro._id === projectProposalId)

    if (!proposal) {
        return <p>Loading Proposal..</p>
    }
    
    const currentUserId = (props.user?._id || props.user?.id || props.user)?.toString()
    
    const ownerId = (proposal.businessOwner?._id || proposal.businessOwner?.id || proposal.businessOwner)?.toString()

    const isBusinessOwner = Boolean(currentUserId && ownerId && currentUserId === ownerId) 

    const isAccepted = proposal.status?.toLowerCase() === 'accepted'

    const isUnpaid = !proposal.paymentStatus || proposal.paymentStatus.toLowerCase() === 'unpaid' 

    const handlePayment = async () => {
        try {
            setErrorMessage('')
            const data = await paymentService.create(proposal._id)
            if (data.clientSecret) {
                setClientSecret(data.clientSecret)
                setShowPayment(true)
            } else if (data.error) {
                setErrorMessage(data.error)
            }
        } catch (error) {
            setErrorMessage('Failed to navigate to payment', error.message)
        }
    }

    const handlePaymentDone = async (paymentId) => {
        try {
            const updatedStatus = await paymentService.confirm(proposal._id, paymentId)
            setShowPayment(false)
            if(props.setProposals) {
                props.setProposals((prev) => 
                prev.map((pro) =>
                pro._id === updatedStatus._id ? updatedStatus : pro))
            }
            if (props.onUpdateStatus) {
                props.onUpdateStatus(updatedStatus)
            } 
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='proposal-details-container'>
            <div className='proposal-details-card'>
                <div className='proposal-details-top'>
                    <h2>{proposal.name}</h2>
                    <p>Status: {proposal.status}</p>
                    <p>Payment: {proposal.paymentStatus || 'Unpaid'}</p>
                </div>
                <hr />
                <div className='proposal-details-rest'>
                    <div className='proposal-details'>
                        Description:
                        <p>{proposal.description}</p>
                    </div>

                    <div className='proposal-details'>
                        Budget:
                        <p>{proposal.budget}</p>
                    </div>

                    <div className='proposal-details'>
                        Features:
                        <p>{proposal.features}</p>
                    </div>

                    <div className='proposal-details'>
                        Theme:
                        <p>{proposal.theme}</p>
                    </div>
                </div>
                {isBusinessOwner && isAccepted && isUnpaid && (
                    <div>
                        <p>Your project proposal has been accepted! Please proceed to payment to start website development.</p>
                        {!showPayment ? (
                            <button onClick={handlePayment}> Pay ${proposal.budget} Now </button>
                        ) : (
                            clientSecret && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <CheckoutForm clientSecret={clientSecret} projectProposalId={proposal._id} onPaymentSuccess={handlePaymentDone} />
                                </Elements>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProposalDetails