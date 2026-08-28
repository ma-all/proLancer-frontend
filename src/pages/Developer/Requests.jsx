import * as proposalService from '../../services/proposal'

const Requests = (props) => {

    const currentUserId = (props.user?._id || props.user)?.toString()

    const proposalRequests = props.proposals?.filter(
        (proposal) => {
            const developerId = (proposal.developer?._id || proposal.developer)?.toString()
            return developerId === currentUserId
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
            <h2>Proposal Requests</h2>
            <div className='proposal-details-container'>
            
            {proposalRequests.map((request) => (
                <div key={request._id} className='proposal-details-card'>
                    {/* <p>does it print anything inside</p> */}
                    <p>{request.name}</p>
                    <p>{request.description}</p>
                    <p>{request.budget}</p>
                    <p>{request.features}</p>
                    <p>{request.theme}</p>
                    <p>{request.status}</p>

                    <br />
                    {(request.status === 'Pending' || !request.status) && (
                        <>
                            <button onClick={() => handleStatus(request._id, 'Accepted')}>Accept</button>
                            <button onClick={() => handleStatus(request._id, 'Rejected')}>Reject</button>
                        </>
                    )}
                </div>
            ))}
            </div>
        </>
    )
}
export default Requests