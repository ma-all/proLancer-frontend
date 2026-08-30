import { useNavigate, useParams } from "react-router"

const ProfileDetailsBus = (props) => {

    const { bussinessOwnerId } = useParams()

    const navigate = useNavigate()

    const businessOwner = bussinessOwnerId ? props.businessOwner?.find((owner) =>
        owner._id === bussinessOwnerId) : props.user

    // const ownProfile = !bussinessOwnerId || props.user?._id === businessOwner?._id

    console.log('what is the error', businessOwner)

    if (!businessOwner) {
        <div className="profile-details-wrapper">
        return <p>Loading Profile....</p>
        </div>
    }

    return (
        <>
            <h2>{businessOwner.username}'s Profile</h2>

            {businessOwner.businessCategory && (
                <h3>Category: {businessOwner.businessCategory}</h3>
            )}

            Business Description:
            <p>{businessOwner.businessDescription}</p>

            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={() => navigate('/business-owner/profile/form')}> Edit Profile </button>
        </>
    )
}
export default ProfileDetailsBus