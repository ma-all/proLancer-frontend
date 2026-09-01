import { useState } from "react";
import * as userService from '../../services/user'
import { useNavigate } from "react-router"

const ProfileForm = (props) => {

    const user = props.user
    const setUser = props.setUser
    const navigate = useNavigate()

    const CATEGORIES = ['Cafe', 'Restaurant', 'Bakery', 'Catering', 'Jewelry', 'Cosmetics', 'Clothing', 'Footware', 'Photo & Videography', 'Event Planning', 'Beauty Salon', 'Spa', 'Tech Equipment', 'Equipment & Machinery', 'Gym', 'Art Studio', 'Handmade Crafts', 'Interior Design', 'Furniture & Home Decor', 'Architecture', 'Stationary', 'Medical Clinic', 'Pharmacy', 'Dental Clinic', 'Fitness & Health', 'Other']

    const initialState = {
        businessDescription: user?.businessDescription || '',
        businessCategory: user?.businessCategory || '',
    }
    const [formData, setFormData] = useState(initialState)


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleCategorySelect = (category) => {
        setFormData({ ...formData, businessCategory: category })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updatedUser = await userService.update(user._id, formData)
            if (setUser)
                setUser(updatedUser)
            navigate('/dashboard')
        } catch (error) {
            console.log('error updating profile:', error)

        }
    }

    return (
        <div className="profile-form-wrapper" >
            <div className="profile-card">
                <h2 className="profile-heading">Profile</h2>
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="input-group">
                        <label className="desc-profile">Description:</label>
                        <br />
                        <br />
                        <textarea name="businessDescription" rows={4} value={formData.businessDescription} onChange={handleChange} className="desc-textarea"/>
                    </div>
                    <br />
                    <div className="category-group">
                        <p className="category-lable">Category:</p>
                        <div className="category-pills" >
                            {CATEGORIES.map((cate) => (
                                <button key={cate} type="button" className={formData.businessCategory === cate ? 'active' : ''} onClick={() => handleCategorySelect(cate)}>
                                    {cate}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button className="save-profile-btn" type='submit'>Save Profile</button>
                </form>
            </div>

        </div>
    )



}
export default ProfileForm