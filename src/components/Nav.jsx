import { Link } from "react-router"


const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="nav-brand" to="/">Logo</Link>
            {props.user ? (
                <ul>
                    {props.user.role === 'Business Owner' && (
                        <>
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>

                            <li>
                                <Link to='/developers'>Developers</Link>
                            </li>

                            <li>
                                <Link to='/projectProposal'>Proposals</Link>
                            </li>

                            <li>
                                {/* //need to change this link */}
                                <Link to='/projectProposal'>Projects</Link>
                            </li>

                            <li>
                                <Link to='/chatBusinessOwner'>Chats</Link>
                            </li>

                            <li>
                             <Link to="/business-owner/profile">Profile</Link>
                            </li>
                        </>
                    )}


                    {props.user.role === 'Developer' && (
                        <>
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>

                            <li>
                                <Link to='/requests'>Requests</Link>
                            </li>

                            <li>
                                {/* need to change this link */}
                                <Link to='/projectProposal'>Projects</Link> 
                            </li>

                            <li>
                                <Link to='/chatDeveloper'>Chats</Link>
                            </li>

                            {/* <li>
                                <link to="/developer/profile">profile</link>
                            </li> */}
                        </>
                    )}

                    <li>
                        <Link to="/" onClick={handleSignOut}>Sign Out</Link>
                    </li>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/sign-up'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/sign-in'>Sign In</Link>
                    </li>
                </ul>
            )}

        </nav>
    )
}

export default Nav