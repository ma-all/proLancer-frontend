import { useState } from "react"
import { useNavigate } from "react-router"
import { User, Search }  from 'lucide-react'

const DeveloperList = (props) => {

    const developers = props.allDevelopers || []
    const [searchTerm, setSearchTerm] = useState("")

    const navigate = useNavigate()
    
    const handleSendProposal = (developerId) => {
        navigate('/projectProposal/form', {
            state: { targetDeveloperId: developerId}
        })
    }

    const handleViewDetails = (developerId) => {
        navigate(`/developer/${developerId}`)
    }

  const filteredDevelopers = developers.filter((dev) => {
        const usernameMatch = dev.username?.toLowerCase().includes(searchTerm.toLowerCase())
        const titleMatch = dev.developerTitle?.toLowerCase().includes(searchTerm.toLowerCase())
        
        return usernameMatch || titleMatch
    })

    return (
        <div className="developer-page">
            <div className="developer-page-header">
            <h2>Browse Developers</h2>

           <div className="search-wrapper">
                    <Search size={18} className="search-icon"/>
                    <input 
                        type="text" 
                        placeholder="Search by name or title.." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="search-input"
                    />
                </div>
            </div>
            
            <div className="developers-container">
                {filteredDevelopers.map((dev) => (
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
                    <br/>
                    <button  className="card-btn" onClick={() => handleViewDetails(dev._id)}>View Details</button>
                </div>
            ))}
            </div>
        </div>
    )
    
}

export default DeveloperList