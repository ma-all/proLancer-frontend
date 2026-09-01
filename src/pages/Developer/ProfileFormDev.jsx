import React, { useState } from "react"
import { useNavigate } from "react-router"
import * as userService from '../../services/user'

const ProfileFormDev = (props) => {
    const navigate = useNavigate()

    const skillsOptions = [
        'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React',
        'BootStrap', 'SCSS', 'Angular', 'Node.js', 'Python',
        'Java', 'C#', 'Express.js', 'Django', 'MongoDB', 'PHP',
        'PostgreSQL', 'JWT Authentication', 'WebSockets', 'GitHub',
        'Firebase', 'Cloudinary', 'Stripe']

    const initialState = {
        developerDescription: props.user?.developerDescription || '',
        developerTitle: props.user?.developerTitle || '',
        githubUrl: props.user?.githubUrl || [],
        deployedLinks: props.user?.deployedLinks || [],
        skills: props.user?.skills || []
    }

    const [formData, setFormData] = useState(initialState)

    const [currentGitHubInput, setcurrentGitHubInput] = useState('')

    const [currentDeployed, setCurrentDeployed] = useState('')

    const handleSkillSelector = (skill) => {

        const currentSkills = formData.skills
        const isAlreadySelected = currentSkills.includes(skill)

        const updatedSkills = isAlreadySelected ? currentSkills.filter((sk) =>
            sk !== skill) : [...currentSkills, skill]

        setFormData({ ...formData, skills: updatedSkills })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleAddGithubUrl = () => {
        if (currentGitHubInput === '') return
        setFormData({
            ...formData,
            githubUrl: [...formData.githubUrl, currentGitHubInput],

        })
        setcurrentGitHubInput('')
    }

    const handleRemoveGithubUrl = (index) => {
        const updatedUrls = [...formData.githubUrl]
        updatedUrls.splice(index, 1)
        setFormData({
            ...formData,
            githubUrl: updatedUrls
        })
    }

    const handleAddDeployedLinks = () => {
        if (currentDeployed === '')
            return
        setFormData({ ...formData, deployedLinks: [...formData.deployedLinks, currentDeployed] })
        setCurrentDeployed('')
    }

    const handleRemoveDeployedLinks = (index) => {
        const updatedLink = [...formData.deployedLinks]
        updatedLink.splice(index, 1)
        setFormData({ ...formData, deployedLinks: updatedLink })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!props.user?._id) {
            console.log('user Id missing')
            return
        }
        try {
            const updatedUser = await userService.update(props.user._id, formData)
            if (props.setUser)
                props.setUser(updatedUser)
            navigate('/developer/profile')
        } catch (error) {
            console.log('Error updating profile:', error)
        }
    }

    return (
        <div className="profile-form-wrapper">
            <div className="profile-card">
                <h2 className="profile-heading">Profile</h2>
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="input-group">
                        <label className="desc-profile">Title:</label>
                        <input className="title-dev-profile" type='text' name='developerTitle' value={formData.developerTitle} onChange={handleChange} />
                        <br />
                        <br />
                        <label className="desc-profile">Description:</label>
                        <textarea name="developerDescription" rows={4} value={formData.developerDescription} onChange={handleChange} className="desc-textarea" />
                    </div>

                    <div>
                        <label className="desc-profile">GitHub Url:</label>
                        <div className="input-with-btn">
                            <input className="title-dev-profile" type="url" name="githubUrl" value={currentGitHubInput} onChange={(e) => setcurrentGitHubInput(e.target.value)} />

                            <button className='btn-accept btn-add' type="button" onClick={handleAddGithubUrl}> Add Link</button>

                        </div>
                        <ul className="link-list">
                            {formData.githubUrl.map((url, index) => (
                                <li key={index} className="link-list-item">
                                    <span className="link-text">{url}</span>
                                    <button className='btn-accept btn-remove' type='button' onClick={() => handleRemoveGithubUrl(index)}>Remove Link</button>

                                </li>
                            ))}
                        </ul>
                    </div>

                    <label className="desc-profile">Deployed Websites Links:</label>
                    <div className="input-with-btn">
                        <input className="title-dev-profile" type="url" name="deployedLinks" value={currentDeployed} onChange={(event) => setCurrentDeployed(event.target.value)} />

                        <button className='btn-accept btn-add' type='button' onClick={handleAddDeployedLinks}>Add Link</button>
                    </div>
                    <ul className="link-list">
                        {formData.deployedLinks.map((link, index) => (
                            <li key={index} className="link-list-item">
                                <span className="link-text">{link}</span>

                                <button className='btn-accept btn-remove' type='button' onClick={() => handleRemoveDeployedLinks(index)}>Remove Link</button>
                            </li>
                        ))}
                    </ul>

                    <label className="desc-profile">Skills</label>
                    <br />
                    <br />
                    <div className="skills-wrapper">
                        {skillsOptions.map((skill) => {
                            const isSelected = formData.skills.includes(skill)
                            return (
                                <button key={skill} type='button' className={`skill-btns ${isSelected ? 'selected' : ''}`} onClick={() => handleSkillSelector(skill)}>
                                    {skill}
                                </button>
                            )
                        })}
                    </div>

                    <div>
                        <button className="save-profile-btn" type="submit">Save Profile</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ProfileFormDev