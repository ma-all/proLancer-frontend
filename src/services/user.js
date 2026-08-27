import { data } from "react-router"

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`


//update from me
const show = async(userId)=>{
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}`,{
            method: 'GET',
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`},
        })
        const data = await res.json()
        if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data
        
    } catch (error) {
        throw new Error(data.error)
        
    }
}


const update = async(userId, formData)=>{
try {
    const res = await fetch(`${BASE_URL}/users/${userId}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('token')}`
            
            },
            body:JSON.stringify(formData)
        })
        const data = await res.json()
           if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data
    
} catch (error) {
      throw new Error(data.error)
}    

}

const deleteGithubLink = async(userId, githbUrl)=>{
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/github`,{
            method: 'DELETE',
            headers:{
                  'Content-Type':'application/json',
                  Authorization:`Bearer ${localStorage.getItem('token')}`

            },
            body:JSON.stringify({githbUrl})
        })
         const data = await res.json()
        if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data
        
    } catch (error) {
           throw new Error(data.error)
        
    }
}

const deleteDeployedLink = async(userId, link)=>{
    try {
        const res = await fetch(`${BASE_URL}/user/${userId}/deployed`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify({link})

        })
         const data = await res.json()
        if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data
        
    } catch (error) {
        throw new Error(data.error)
        
    }
}

const deleteSkill = async(userId, skill)=>{
    try {
        const res = await fetch(`${BASE_URL}/user/${userId}/skill`,{
          method: 'DELETE',
          headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify({skill})

        })

         const data = await res.json()
        if (data.err) {
            console.log(data.err)
            throw new Error(data.err)
        }

        return data

        
    } catch (error) {
         throw new Error(data.error)
        
    }
}

export {
    show,update,deleteGithubLink,deleteDeployedLink, deleteSkill, 
}




// const index = async (formData) => {
//     try {
//         const res = await fetch(`${BASE_URL}/users`, {
//             method: 'GET',
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         })
//         const data = await res.json()
        

//         if (data.err) {
//             console.log(data.err)
//             throw new Error(data.err)
//         }

//         return data
//     } catch (err) {
//         throw new Error(err)
//     }
// }