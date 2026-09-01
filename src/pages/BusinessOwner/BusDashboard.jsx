import { useState } from "react"
import { FolderOpenDot, ScrollText, MessagesSquare } from 'lucide-react'
import { useNavigate } from "react-router"


const BusDashboard = (props) => {

    const navigate = useNavigate()

    if (!props.user) {
        return <p>Loading dashboard...</p>
    }

    return (
        <section className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome {props.user?.username}!</h1>
            </header>
            <div className="stats-grid">
                <div className="stat-card color" onClick={() => navigate('/projectProposal')}>
                    <div className="stat header">
                        <span className="icon-box">
                            <ScrollText size={25} className="dash-icon"/>
                        </span>
                    </div>
                    <p className="stat-lable">My Proposals</p>
                </div>

                {/* this needs to be fixed */}
                <div className="stat-card color" onClick={() => navigate('/requests')}>
                    <div className="stat-header">
                        <span className="icon-box">
                            <FolderOpenDot size={25} className="dash-icon"/>
                        </span>
                    </div>
                    <p className="stat-lable">My Projects</p>
                </div>
                <div className="stat-card color" onClick={() => navigate('/chat')}>
                    <div className="stat-header">
                        <span className="icon-box">
                            <MessagesSquare size={25} className="dash-icon"/>
                        </span>
                    </div>
                    <p className="stat-lable">My Chats</p>
                </div>
            </div>
        </section>
    )
}

export default BusDashboard