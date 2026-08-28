import { useParams } from "react-router"

const DeveloperDetails =(props) => {


    const { developerId } = useParams()

    const developer = props.developers?.find((dev) => 
    dev._id === developerId)

    return (
        <>
            <p>{developer.username}</p>
            <p>{developer.developerTitle}</p>
            <p>{developer.developerDescription}</p>
            <p>{developer.githubUrl}</p>
            <p>{developer.deployedLinks}</p>
            <p>{developer.skills}</p>

            <button type='submit'>Accept</button>
            <button type='submit'>Reject</button>
        </>
    )
}

export default DeveloperDetails