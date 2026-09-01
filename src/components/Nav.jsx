import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Menu } from 'lucide-react'
import { CircleUserRound } from "lucide-react"
import { X } from "lucide-react"
import { LogOut } from 'lucide-react'

const Nav = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const isBusinessOwner = props.user?.role === 'Business Owner'

    const isDeveloper = props.user?.role === 'Developer'

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev)
    }

    const closeSidebar = () => {
        setIsOpen(false)
    }

    const handleSignOut = () => {
        closeSidebar()
        localStorage.removeItem('token')
        props.setUser(null)
        navigate('/')
    }

    return (
        <div className="nav-color">
            <header className="header-top">
                <div className="header-left">
                    <button onClick={toggleSidebar} className='menu-btn'>
                        <Menu size={25} />
                    </button>
                    {/* i need to add the link to dashboard here */}
                    <Link onClick={closeSidebar} className="nav-brand">
                        PROLANCER
                    </Link>
                </div>
            </header>

            {isOpen &&
                <>
                    <div onClick={closeSidebar} className="sidebar-overlay" />

                    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                        <div className="sidebar-header">
                            <button onClick={closeSidebar} className="close-btn">
                                <X />
                            </button>
                        </div>

                        <nav className="sidebar-links">
                            {props.user ? (
                                <>
                                    {isBusinessOwner && (
                                        <>
                                            <div className="menu-section-title">Business Owner</div>

                                            <Link to="/">Dashboard</Link>
                                            <Link to='/developers' onClick={closeSidebar}>Developers</Link>
                                            <Link to='/projectProposal' onClick={closeSidebar}>Proposals</Link>
                                            <Link to='/chat' onClick={closeSidebar}>Chats</Link>
                                            <Link to="/business-owner/profile" onClick={closeSidebar}>Profile</Link>
                                        </>
                                    )}

                                    {isDeveloper && (
                                        <>
                                            <div className="menu-section-title">Developer </div>
                                            <Link to="/" onClick={closeSidebar}>Dashboard</Link>
                                            <Link to='/requests' onClick={closeSidebar}>Requests</Link>
                                            <Link to='/projectslist' onClick={closeSidebar}>Projects</Link> 
                                            <Link to='/chat' onClick={closeSidebar}>Chats</Link>
                                            <Link to="/developer/profile" onClick={closeSidebar}>profile</Link>
                                        </>
                                    )}

                                    <button onClick={handleSignOut} className="signout-btn">
                                        <LogOut size={25} />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to='/' onClick={handleSignOut}>Home</Link>
                                    <Link  to='/sign-up' onClick={handleSignOut}>Sign Up</Link>
                                    <Link to='/sign-in' onClick={handleSignOut}>Sign In</Link>
                                </>
                            )}
                        </nav>
                    </aside>
                </>
            }

        </div>
    )
}

export default Nav