import { useNavigate, useParams } from "react-router"
import * as proposalService from '../../services/proposal'
import * as chatService from '../../services/chat'

const ProjectsDetails = (props) => {

    const { projectlistId } = useParams()

    const navigate = useNavigate()

    const currentUserId = (props.user?._id || props.user)?.toString()

    const project = props.proposals?.find((proj) =>
        proj._id === projectlistId)

    const handleChangeStatus = async (event) => {
        const updatedStatus = event.target.value
        try {
            const newStatus = await proposalService.updateStatus(project._id, { status: updatedStatus })
            if (props.setProposals) {
                props.setProposals((prev) => 
                prev.map((proj) =>
                (proj._id === project._id ? newStatus : proj)
                ))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendChat = async () => {
        try {
            const ownerId = (project.businessOwner?._id || project.businessOwner)?.toString()
            const chat = await chatService.create({ developerId: currentUserId, ownerId: ownerId, businessOwnerId: ownerId })
            navigate(`/chat/${chat._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    if (!project)
        return <p>Loading Projects..</p>

    return (
        <div>
            <div>
                <h2>{project.name}</h2>
                <p>{project.paymentStatus || 'Unpaid'}</p>
                <p>Current Status: {project.status}</p>
                <hr />
                <div>
                    Update Status:
                    <select id='selectStatus' value={project.status || 'Accepted'} onChange={handleChangeStatus}>
                        <option value='Accepted'>Accepted</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                    </select>
                </div>
            </div>

            <hr />
            <h3>Project Details</h3>
            <p>{project.description}</p>
            <p>{project.budget}</p>
            <p>{project.features}</p>
            <p>{project.theme}</p>

            <button onClick={handleSendChat}>Send Message</button>
        </div>
    )
}

export default ProjectsDetails