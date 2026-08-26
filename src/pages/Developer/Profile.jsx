import { useState } from "react"
import * as userService from '../../services/user'

const Profile=(props)=>{
    const AVAILABLE_SKILLS=[
     'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React',
     'BootStrap', 'SCSS', 'Angular', 'Node.js', 'Python',
     'Java', 'C#', 'Express.js', 'Django', 'MongoDB', 'PHP',
     'PostgreSQL', 'JWT Authentication', 'WebSockets', 'GitHub', 
     'Firebase', 'Cloudinary', 'Stripe'

    ]
     const [formData, setFormData]=useState({
        description: props.user?.description ||'',
        githubUrl: props.user?.githubUrl|| [], 
        deployedLinks: props.user?.deployedLinks?.[0]||'',
        skills: props.user?.skills ||[],

     })

    const [currentGitHubInput, setcurrentGitHubInput]=useState('')



    const handleChange = (e)=>{
        setFormData({ ...formData,[e.target.name]: e.target.value})

    }

    const handleAddGithubUrl = ()=>{
        if (currentGitHubInput ==='')return
        setFormData({
            ...formData,
            githubUrl: [...formData.githubUrl, currentGitHubInput],

        })
        setcurrentGitHubInput('')
    }

    const handleRemoveGithubUrl = (index)=>{
      const updatedUrls = [...formData.githubUrl]
      updatedUrls.splice(index,1)
      setFormData({
        ...formData,
        githubUrl:updatedUrls
      })
    }



    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const updatedUser = await update(props.user._id , formData)
            if(props.setUser) props.setUser(updatedUser)
            
        } catch (error) {
            console.log('Error updating profile:',error)
            
        }
    }
    return(
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Description</label>
                <textarea name="description" rows={4} value={formData.description} onChange={handleChange} />


               <div>
                <label>GitHub Url</label>
                <div>
                     <input type="url" name="githubUrl" placeholder="GitHub url" value={currentGitHubInput} onChange={(e)=> setcurrentGitHubInput(e.target.value)} />
               <button type="button" onClick={handleAddGithubUrl}>Add</button>
                </div>
                <ul>
                    {formData.githubUrl.map((url,index)=>(
                        <li key={index}>
                            <span>{url}</span>
                            <button onClick={()=> handleRemoveGithubUrl(index)}>Remove</button>

                        </li>
                    ))}
                </ul>
               </div>
                

                <input type="url" name="deployedLinks" placeholder="Project Deployed url" value={formData.deployedLinks} onChange={handleChange} />


                <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange}
                
                />
                <div>
                    {/* <button onClick={()=> window.history.back()}>Back</button> */}
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
    )

}

export default Profile