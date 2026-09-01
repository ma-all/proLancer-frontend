import { useNavigate, useParams } from "react-router"


const ProfileDetailsDev = (props) => {

    const { developerId } = useParams()

    const navigate = useNavigate()

    const developer = developerId ? props.developers?.find((dev) =>
        dev._id === developerId) : props.user

    if (!developer) {
        return <p>Loading Profile..</p>
    }

    return (
        <div className="dev-details-container">
            <div className="dev-details-card">
                <div className="dev-header">
                    <h2>{developer?.username || developer?.name}'s Profile</h2>
                </div>

                {developer.developerTitle && (
                    <h3 className="dev-title-pro">{developer.developerTitle}</h3>
                )}

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

                <div className="profile-btns">
                    {/* <button  onClick={handleEdit}>Edit</button> */}
                    <button className="btn-message" onClick={() => navigate(-1)}>Back</button>
                    <button className="btn-message" onClick={() => navigate('/developer/profile/form')}> Edit Profile </button>
                </div>
            </div>
        </div>
    )


}
export default ProfileDetailsDev