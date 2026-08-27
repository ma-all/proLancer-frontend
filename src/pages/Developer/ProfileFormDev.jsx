import React from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import * as userService from '../../services/user'
import { index } from "../../services/proposal"

const ProfileFormDev=(props)=>{
    // const{developerId}=useParams()
    const navigate = useNavigate()
    const user = props.user
    
    const SKILLS_OPTIONS=[
     'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React',
     'BootStrap', 'SCSS', 'Angular', 'Node.js', 'Python',
     'Java', 'C#', 'Express.js', 'Django', 'MongoDB', 'PHP',
     'PostgreSQL', 'JWT Authentication', 'WebSockets', 'GitHub', 
     'Firebase', 'Cloudinary', 'Stripe'

    ]
    // const developer = (props.developers && props.developers.find((dev)=>dev._id === developerId || props.user))
     const [formData, setFormData]=useState({
        description: props.user?.description ||'',
        githubUrl: props.user?.githubUrl|| [], 
        deployedLinks: props.user?.deployedLinks ||[],
        skills: props.user?.skills ||[],

     })

    const [currentGitHubInput, setcurrentGitHubInput]=useState('')



    const handleChange = (e)=>{
        setFormData({ ...formData,[e.target.name]: e.target.value})

    }


    // const handleArraychange=(index,filed,value)=>{
    //     const update = [...formData[filed]]
    //     update[index]=value
    //     setFormData({ ...formData, [filed]: update)
    // }

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
        if(!props.user?._id){
            console.log('user Id missing')
            return
        }
        try {
            const data ={
                ...formData,
                developerDescription:formData.description
            }
            
             const updatedUser = await userService.update(props.user._id , data)
            if(props.setUser) {
                props.setUser(updatedUser)
            }

                navigate('/developer/profile')
            
        } catch (error) {
            console.log('Error updating profile:',error)
            
        }
    }

   

    

    const handleSkillschange=(e)=>{
      const selectedOptions = Array.from( e.target.selectedOptions, (option) => option.value)
        setFormData({
            ...formData,
            skills:selectedOptions
        })
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
                
                Skills:
                <select name="skills" multiple value={formData.skills} onChange={handleSkillschange}>
                    {SKILLS_OPTIONS.map((skill)=>(
                        <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>
                {/* <input type="text" name="skills" placeholder="Skills" value={formData.skills} onChange={handleChange}
                
                /> */}
                <div>
                    {/* <button onClick={()=> window.history.back()}>Back</button> */}
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default ProfileFormDev