import { Link } from "react-router"


const Nav = (props) => {

    const handleSignOut = () => {
        localStorage.removeItem('token')
        props.setUser(null)
    }

    return (
        <nav>
            <Link className="nav-brand" to="/">Logo</Link>
            { props.user ? (
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    {props.user.role === 'Business Owner'&&(
                        <li>
                            {/* <link to="/business-owner/profile">profile</link> */}
                        </li>
                    )}


                    {props.user.role === 'developer'&& (
                        <li>
                            <link to="/developer/profile">profile</link>
                        </li>
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
            ) }

        </nav>
    )
}

export default Nav