import { useEffect, useState } from "react"
// import { index } from '../../services/user'

const Dashboard = (props) => {

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
                <span className="icon-box"></span>
                </div>
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

export default Dashboard