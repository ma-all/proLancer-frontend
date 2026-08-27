import React from "react"
import { useNavigate, useParams } from "react-router"


const ProfileDetailsDev = (props) => {
    const { developerId } = useParams()
    const navigate = useNavigate()

    // const devloper = props.developers?.find((dev) =>
    //     dev._id === developerId)

    const developer = 
    (props.developers && props.developers.find((dev) => dev._id === developerId)) 

    return(
        <div>
            <h2>Profile</h2>


            <div>
                <h3>Description</h3>
                <p>{developer?.developerDescription}</p>
            </div>


            <div>
                <h3>GitHub</h3>
                <ul>
                    {developer?.githubUrl?.map((url, index)=>(
                        <li key={index}>
                            <a href={url}>{url}</a>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Deployed Link</h3>
                {/* <p>
                    <a href={developer?.deployedLinks}>
                        {devloper?.deployedLinks}
                    </a>
                </p> */}
                <ul>
                    {developer?.deployedLinks?.map((url, index)=>(
                        <li key={index}>
                            <a href={url}>{url}</a>
                        </li>
                    ))}
                </ul>
            </div>


            <div>
                <h3> skills</h3>
                <ul>
                    {developer?.skills?.map((skill, index)=>(
                        <li key={index}>
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>



            <div>
                {/* <button  onClick={handleEdit}>Edit</button> */}
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate('/developer/profile/form')}> Edit Profile </button>
            </div>
        </div>
    )
 

}
export default ProfileDetailsDev