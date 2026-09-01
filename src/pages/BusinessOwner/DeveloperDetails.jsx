import { useNavigate, useParams } from "react-router"
import * as chatService from '../../services/chat'

const ProfileDetailsDev = (props) => {
    const { developerId } = useParams()
    const navigate = useNavigate()

    const developer = developerId ? props.developers?.find((dev) =>
        dev._id === developerId) : props.user

    const handleSendChat = async () => {
        if (!developer?._id) {
            setErrorMessage('Cannot create chat at the moment.')
            return
        }
        const chat = await chatService.create({ developerId: developer._id })
        console.log('Created Chat Response:', chat)
        navigate(`/chat/${chat._id}`)
    }

    return (
        <div className="dev-details-container">
            <div className="dev-details-card">
                <div className="dev-header">
                    <h2>{developer.username}'s Profile</h2>

                    {developer.developerTitle && (
                        <h3 className="dev-title">{developer.developerTitle}</h3>
                    )}
                </div>

                <div className="dev-section">
                    <h3 className="section-heading">Description</h3>
                    <p className="description-text">{developer?.developerDescription}</p>
                </div>

                <div className="dev-section">
                    <h3 className="section-heading">GitHub Repositories</h3>
                    {developer.githubUrl && developer.githubUrl.length > 0 ? (
                        <ul className="link-list">
                            {developer?.githubUrl?.map((url, index) => (
                                <li key={index} className="link-item">
                                    <a href={url} className="link-url">{url}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-msg">No github links added</p>
                    )}

                </div>

                <div className="dev-section">
                    <h3 className="section-heading">Deployed Websites</h3>
                    {developer.deployedLinks && developer.deployedLinks.length > 0 ? (
                        <ul className="link-list">
                            {developer?.deployedLinks?.map((url, index) => (
                                <li key={index} className="link-item">
                                    <a href={url} className="link-url">{url}</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-msg">No deployed websites</p>
                    )}
                </div>

                <div className="dev-section">
                    <h3 className="section-heading"> skills</h3>
                    {developer.skills && developer.skills.length > 0 ? (
                        <ul className="link-list">
                            {developer?.skills?.map((skill, index) => (
                                <li key={index} className="link-item">
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-msg">No skills added</p>
                    )}

                </div>

                <br />

                <div>
                    {developerId && (
                        <button className="btn-message" onClick={handleSendChat}>Send Message</button>
                    )}
                </div>
            </div>
        </div>
    )


}
export default ProfileDetailsDev