import { Link } from "react-router"
import { Laptop, BriefcaseBusiness } from 'lucide-react'

const Landing = () => {
    return (
        <div className="landing-wrapper">
            <div className="landing-card">
                <header className="landing-header">
                    <h1 className="landing-title">
                        Welcome to <span className="highlight-text">ProLancer</span>
                    </h1>
                    <p className="landing-description">Connecting top developers with business owners to build modern web solutions. </p>
                </header>
                <div className="landing-sign-forms">
                    <p>Ready to get started?</p>
                    <div className="landing-btns">
                        <Link to='/sign-in' className="btn-accept">Sign In</Link>
                        <Link to='/sign-up' className="btn-accept">Sign up</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing