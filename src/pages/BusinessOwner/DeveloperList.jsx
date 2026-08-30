import { useNavigate } from "react-router"

const DeveloperList = (props) => {

    const developers = props.allDevelopers

    const navigate = useNavigate()
    
    const handleSendProposal = (developerId) => {
        navigate('/projectProposal/form', {
            state: { targetDeveloperId: developerId}
        })
    }

    const handleViewDetails = (developerId) => {
        navigate(`/developer/${developerId}`)
    }

    return (
        <>
            <h2>Browse Developers</h2>
            <div className="developers-container">
            {developers.map((dev) => (
                <div key={dev._id}>
                    <p>{dev.username}</p>
                    <p>{dev.developerTitle}</p>
                    <br />

                    <button onClick={() => handleSendProposal(dev._id)}>Send Proposal</button>
                    <button onClick={() => handleViewDetails(dev._id)}>View Details</button>
                </div>
            ))}
            </div>
        </>
    )
    
}

export default DeveloperList