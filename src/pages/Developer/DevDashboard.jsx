import { useEffect, useState } from "react"
import {FolderOpenDot, ScrollText} from 'lucide-react'


const DevDashboard = (props) => {

    const [allUsers, setAllUsers] = useState([])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const usersData =  await index()
    //         setAllUsers(usersData)
    //     }
    //     fetchUsers()
        
    // }, [])

    return (
        <section className="dashboard-container">
            <header className="dashboard-header">
                <h1>Welcome {props.user?.username || "[Business Owner Name]"}!</h1>
            </header>
            <div className="stats-grid">
            <div className="stat-card blue">
            <div className="stat header">
                <span className="icon-box">
                    <ScrollText size={25}/>
                
                </span>
                </div>
                <p className="stat-lable">Active Proposals</p>
                </div>

                <div className="stat-card teal">
                <div className="stat-header">
                    <span className="icon-box">
                         <FolderOpenDot size={25}/>
                    </span>
                    </div>
                    <p className="stat-lable">My Projects</p>
                    </div>
            {allUsers.map((user) => (
                <div className="card">
                    <header>
                        <h1>
                        {user.username}
                        </h1>
                    </header>
                </div>
            ))}
            </div>
        </section>
    )
}

export default DevDashboard