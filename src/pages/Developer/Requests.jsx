import * as proposalService from '../../services/proposal'

const Requests = (props) => {

    const currentUserId = (props.user?._id || props.user)?.toString()

    const proposalRequests = props.proposals?.filter(
        (proposal) => {
            const developerId = (proposal.developer?._id || proposal.developer)?.toString()
            const isPending = proposal.status === 'Pending' || !proposal.status
            return developerId === currentUserId && isPending
        }
    ) || []

    const handleStatus = async (proposalId, newStatus) => {
        try {
            const updateStatus = await proposalService.updateStatus(proposalId, { status: newStatus })
            if (props.setProposals) {
                props.setProposals((prev) => 
                    prev.map((proposal) => proposal._id === proposalId ? updateStatus : proposal) 
                )
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h2 className='h2'>Proposal Requests</h2>
            <div className='proposal-details-container'>
            
            {proposalRequests.map((request) => (
                <div key={request._id} className='proposal-details-card'>
                    {/* <p>does it print anything inside</p> */}
                    <div className='request-content'>
                    <p className='request-name'>{request.name}</p>
                    <p className='request-description'>{request.description}</p>
                    <p className='request-budget'>{request.budget}</p>
                    <p className='request-features'>{request.features}</p>
                    <p className='request-theme'>{request.theme}</p>
                    <p className='request-status'>{request.status}</p>
                    </div>

                    <br />
                    {(request.status === 'Pending' || !request.status) && (
                        <div className='actions-container'>
                            <button className='btn-accept' onClick={() => handleStatus(request._id, 'Accepted')}>Accept</button>
                            <button className='btn-reject' onClick={() => handleStatus(request._id, 'Rejected')}>Reject</button>
                        </div>
                    )}
                </div>
            ))}
            </div>
        </>
    )
}
export default Requests