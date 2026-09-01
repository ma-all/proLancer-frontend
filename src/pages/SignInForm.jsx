import { useNavigate, Link } from "react-router"
import { useState } from "react"
import { signIn } from "../services/auth"
import * as userService from '../services/user'

const SignInForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
    }
    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setMessage('')
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const signedInUser = await signIn(formData)
            if (signedInUser?._id) {
                const fullUser = await userService.show(signedInUser._id)
                props.setUser(fullUser)
            } else {
                props.setUser(signedInUser)
            }
            
            setFormData(initialState)
            navigate('/')
        } catch(err) {
            setMessage(err.message)
        }
    }

    return(
        <div className="signin-wrapper">
        <section className="signin-card" >
            <header className="signin-header" >
            <h1>Sign In</h1>
           {message && <p className="error">{message}</p>}
            </header>

            <form onSubmit={handleSubmit} className="signin-form">
                <div className="form-group">
                Username:
                <input type="text" name="username" value={formData.username} required onChange={handleChange} />
                </div>
                <div className="form-group">
                Password:
                <input type="password" name="password" value={formData.password} required onChange={handleChange} />
                </div>

                <div className="actions">
                    <button type="submit" className="submit-btn">Sign In</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate('/')}>Cancel</button>
                </div>

                <div className="signup-link-wrapper">
                    <p>Don't have an account yet?
                        <br />
                        <Link to='/sign-up'>Sign Up</Link>
                    </p>
                </div>
            </form>
        </section>
        </div>
    )
}

export default SignInForm
