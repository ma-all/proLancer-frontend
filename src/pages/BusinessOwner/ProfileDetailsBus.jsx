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
            <div className="profile-loading-card">
                <div className="spinner"></div>
        return <p>Loading Profile....</p>
        </div>
        </div>
    }

    return (
        <div className="profile-details-wrapper">
            <div className="profile-details-card">
                <div className="profile-details-header">
            <h2 className="profile-title">{businessOwner.username}'s Profile</h2>

            {businessOwner.businessCategory && (
                <h3 className="category-badge">Category: {businessOwner.businessCategory}</h3>
            )}
            </div>

            <div className="description-section">
            <h4 className="section-lable">Business Description:</h4>
            <p className="description-text">{businessOwner.businessDescription}</p>
            </div>

            <div className="profile-actions">

            <button className="btn-secondary" onClick={() => navigate(-1)}>Back</button>
            <button className="btn-primary" onClick={() => navigate('/business-owner/profile/form')}> Edit Profile </button>
        </div>
        </div>
        </div>
    )
}
export default ProfileDetailsBus