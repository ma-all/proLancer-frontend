import { useState } from "react";
import * as userService from '../../services/user'

const ProfileForm=(props)=>{
    const CATEGORIES =['Cafe', 'Restaurant', 'Bakery', 'Catering',
     'Jewelry', 'Cosmetics', 'Clothing', 'Footware', 'Photo & Videography',
      'Event Planning', 'Beauty Salon', 'Spa', 'Tech Equipment',
       'Equipment & Machinery', 'Gym', 'Art Studio',
        'Handmade Crafts', 'Interior Design',
        'Furniture & Home Decor', 'Architecture',
     'Stationary', 'Medical Clinic', 'Pharmacy', 'Dental Clinic', 'Fitness & Health', 'Other']

     const initialState = {
        description: '',
        category: '',
     }   
     const[formData, setFormData]=useState(initialState)
        

        const handleChange = (e) =>{
            setFormData({ ...formData,[e.target.name]: e.target.value})

        }

        const handleCategorySelect = (category)=>{
            setFormData({ ...formData, category})
        }

        const handleSubmit = async(e)=>{
            e.preventDefault()
            try {
                const updatedUser = await update(user._id, formData)
                if(setUser) setUser(updatedUser)
                    if(navigate) navigate('/dashboard')
                
            } catch (error) {
                console.log('error updating profile:',error)
                
            }
        }

        return(
            <div >
                <h2>Profile</h2>
                <form onSubmit={handleSubmit}>
                    <label>Description</label>
                    <textarea
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    />

                    <p>category</p>
                    <div >
                        {CATEGORIES.map((cate)=>(
                            <button
                            key={cate}
                            type="button"
                            className={formData.category === cate ?'active': ''}
                            onChange={()=> handleCategorySelect(cate)}
                            
                            >
                                {cate}
                            </button>


                        ))}


                    </div>

                </form>
            </div>
        )



    }
export default ProfileForm