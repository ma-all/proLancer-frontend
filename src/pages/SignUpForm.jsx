import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        email: '',
        role: 'Developer',
        password: '',
        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const newUser = await signUp(formData)
            props.setUser(newUser)
            setFormData(initialState)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        if (formData.username && formData.email && formData.role && formData.password && formData.password === formData.confirmPassword) {
            return true
        } else return false
    }

    return (
        <section className="card">
            <header>
                <h1>Sign Up</h1>
                <p>{message}</p>
            </header>
            <form onSubmit={handleSubmit}>
                Username:
                <input type="text" name="username" onChange={handleChange} value={formData.username} required />

                Email:
                <input type='text' name='email' onChange={handleChange} value={formData.email} required />

                Role:
                <label>
                    <input type='radio' name='role' onChange={handleChange} value='Developer' checked={formData.role === 'Developer'} required />
                    Developer
                </label>

                <label>
                    <input type='radio' name='role' onChange={handleChange} value='Business Owner' checked={formData.role === 'Business Owner'} required />
                    Business Owner
                </label>

                Password:
                <input type="password" name="password" onChange={handleChange} value={formData.password} required />

                Confirm Password:
                <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required />

                <div className="actions">
                    <button type="submit" disabled={!isFormValid()}>Sign Up</button>
                    {/* <button>Cancel</button> */}
                </div>
            </form>
        </section>
    )
}

export default SignUpForm

