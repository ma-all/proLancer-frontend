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
        <div className='requests-wrapper'>
            <h2 className='requests-title'>Proposal Requests</h2>
            <div className='requests-cards-grid'>

                {proposalRequests.map((request) => (
                    <div key={request._id} className='request-card-item'>
                        <div>
                            <div className='request-card-header'>
                                <p className='request-name'>{request.name}</p>
                            </div>

                            <div className='request-card-body'>
                                <p className='request-description'>Description: {request.description}</p>
                                <div className='request-detail-row'>
                                    <p className='request-budget'>Budget: {request.budget}</p>
                                </div>
                                <div className='request-detail-row'>
                                    <p className='request-features'>Features: {request.features}</p>
                                </div>
                                <div className='request-detail-row'>
                                    <p className='request-theme'>Theme: {request.theme}</p>
                                </div>

                            </div>
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
        </div>
    )
}
export default Requests