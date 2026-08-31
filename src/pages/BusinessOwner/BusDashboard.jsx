import { useState } from "react"
import { FolderOpenDot, ScrollText, MessagesSquare } from 'lucide-react'
import { useNavigate } from "react-router"


const BusDashboard = (props) => {

    const navigate = useNavigate()

    const [allUsers, setAllUsers] = useState([])

    return (
        <section className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome {props.user?.username}!</h1>
            </header>
            <div className="stats-grid">
                <div className="stat-card color" onClick={() => navigate('/projectProposal')}>
                    <div className="stat header">
                        <span className="icon-box">
                            <ScrollText size={25} />
                        </span>
                    </div>
                    <p className="stat-lable">My Proposals</p>
                </div>

                {/* this needs to be fixed */}
                <div className="stat-card color" onClick={() => navigate('/requests')}>
                    <div className="stat-header">
                        <span className="icon-box">
                            <FolderOpenDot size={25} />
                        </span>
                    </div>
                    <p className="stat-lable">My Projects</p>
                </div>
                <div className="stat-card color" onClick={() => navigate('/chat')}>
                    <div className="stat-header">
                        <span className="icon-box">
                            <MessagesSquare size={25} />
                        </span>
                    </div>
                    <p className="stat-lable">My Chats</p>
                </div>
                {/* {allUsers.map((user) => (
                    <div className="card">
                        <header>
                            <h1>
                                {user.username}
                            </h1>
                        </header>
                    </div>
                ))} */}
            </div>
        </section>
    )
}

export default BusDashboard