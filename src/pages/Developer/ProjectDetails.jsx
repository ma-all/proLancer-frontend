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
        <div className='project-detail-container'>
            <div className='detail-header-card'>
               <div className='header-top'> 
                <h2 className='project-title'>{project.name}</h2>
                {/* <p>{project.paymentStatus || 'Unpaid'}</p> */}
                <span className={`payment-status ${project.paymentStatus?.toLowerCase() || 'unpaid'}`}>
                 {project.paymentStatus || 'Unpaid'}
                 </span>
                 </div>
                <p className='current-status'>Current Status: <span className='status-highlight'>{project.status}</span></p>
                <hr  className='card-divider'/>
                <div className='status-updater'>
                    Update Status:
                    <select id='selectStatus' value={project.status || 'Accepted'} onChange={handleChangeStatus}>
                        <option value='Accepted'>Accepted</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                    </select>
                </div>
            </div>

            <hr />
            <div className='detail-content-card'>
            <h3 className='section-title'>Project Details</h3>
            <p className='project-description'>{project.description}</p>

            <div className='details-grid'>
        <div className='detail-item'>
           <span className='detail-label'>Budget</span>
          <span className='detail-value project-budget'>BHD {project.budget}</span>
        </div>

           <div className='detail-item'>
          <span className='detail-label'>Theme</span>
          <span className='detail-value'>{project.theme}</span>
        </div>

        <div className='detail-item full-width'>
          <span className='detail-label'>Features</span>
          <span className='detail-value'>{project.features}</span>
        </div>
      </div>

            <button className='btn-send-message' onClick={handleSendChat}>Send Message</button>
        </div>
        </div>
    )
}

export default ProjectsDetails