import { useNavigate } from "react-router"
import { User }  from 'lucide-react'

const DeveloperList = (props) => {

    const developers = props.allDevelopers

    const navigate = useNavigate()
    
    const handleSendProposal = (developerId) => {
        navigate('/projectProposal/form', {
            state: { targetDeveloperId: developerId}
        })
    }

    // const handleViewDetails = (developerId) => {
    //     navigate('/') //i need to add the route to the developer details, and create its page
    // }

    return (
        <div className="developer-page">
            <div className="developer-page-header">
            <h2>Browse Developers</h2>
            </div>
            <div className="developers-container">
            {developers.map((dev) => (
                <div key={dev._id} className="developer-card">
                    <div className="icon-wrapper">
                        <div className="dev-icon">
                            <User size={25} />
                            </div>

                    </div>


                    <h3>{dev.username}</h3>
                    <p className="deeloper-titel"> {dev.developerTitle}</p>
                    <br />

                    <button className="card-btn" onClick={() => handleSendProposal(dev._id)}>Send Proposal <span className="arrow"></span></button>
                    {/* <button onClick={() => handleViewDetails(dev._id)}>View Details</button> */}
                </div>
            ))}
            </div>
        </div>
    )
    
}

export default DeveloperList