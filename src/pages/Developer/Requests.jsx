import * as proposalService from '../../services/proposal'

const Requests = (props) => {

    const proposalRequests = props.proposals?.filter(
        (proposal) => 
            proposal.developer === props.user?._id
    ) 

    const handleStatus = async (proposalId, newStatus) => {
        try {
            const updateStatus = await proposalService.updateStatus(proposalId, { status: newStatus })
            if (props.setProposals) {
                props.setProposals((prev) => 
                    prev.map((proposal) => proposal._id === proposalId ? updateStatus : proposal) 
                )
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2>Proposal Requests</h2>
            {proposalRequests.map((request) => (
                <div key={request._id}>
                    {/* <p>does it print anything inside</p> */}
                    <p>{request.name}</p>
                    <p>{request.description}</p>
                    <p>{request.budget}</p>
                    <p>{request.features}</p>
                    <p>{request.theme}</p>
                    <p>{request.status}</p>

                    <br />
                    {request.status === 'Pending' && (
                        <>
                            <button onClick={() => handleStatus(request._id, 'Accepted')}>Accept</button>
                            <button onClick={() => handleStatus(request._id, 'Rejected')}>Reject</button>
                        </>
                    )}
                </div>
            ))}
        </>
    )
}
export default Requests