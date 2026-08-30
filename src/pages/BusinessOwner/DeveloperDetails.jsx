import { useNavigate, useParams } from "react-router"
import * as chatService from '../../services/chat'

const ProfileDetailsDev = (props) => {
    const { developerId } = useParams()
    const navigate = useNavigate()

    const developer = developerId ? props.developers?.find((dev) =>
        dev._id === developerId) : props.user

    const handleSendChat = async () => {
        if (!developer?._id) {
            return <p>Cannot create chat at the moment. <br/> Please try again Later</p>
        }
        try {
            const chat = await chatService.create({ developerId: developer._id})
            console.log('Created Chat Response:', chat)
            navigate(`/chat/${chat._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* <h2>{developer.username}'s Profile</h2> */}

            {developer.developerTitle && (
                <h3>{developer.developerTitle}</h3>
            )}

            <div>
                <h3>Description</h3>
                <p>{developer?.developerDescription}</p>
            </div>

            <div>
                <h3>GitHub Repositories</h3>
                {developer.githubUrl && developer.githubUrl.length > 0 ? (
                    <ul>
                        {developer?.githubUrl?.map((url, index) => (
                            <li key={index}>
                                <a href={url}>{url}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No github links added</p>
                )}

            </div>

            <div>
                <h3>Deployed Websites</h3>
                {developer.deployedLinks && developer.deployedLinks.length > 0 ? (
                    <ul>
                        {developer?.deployedLinks?.map((url, index) => (
                            <li key={index}>
                                <a href={url}>{url}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No deployed websites</p>
                )}
            </div>

            <div>
                <h3> skills</h3>
                {developer.skills && developer.skills.length > 0 ? (
                    <ul>
                        {developer?.skills?.map((skill, index) => (
                            <li key={index}>
                                {skill}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No skills added</p>
                )}

            </div>

            <div>
                {/* <button  onClick={handleEdit}>Edit</button> */}
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

            <div>
                {developerId && (
                    <button onClick={handleSendChat}>Send Message</button>
                )}
            </div>
        </div>
    )


}
export default ProfileDetailsDev