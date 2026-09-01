import { Link } from 'react-router'

const ProjectsList = (props) => {

    const currentUserId = (props.user?._id || props.user)?.toString()

    const currentStatus = ['Accepted', 'In Progress', 'Completed']

    const acceptedProjects = props.proposals?.filter((proposal) => {
        const developerId = (proposal.developer?._id || proposal.developer)?.toString()
        return developerId === currentUserId && currentStatus.includes(proposal.status)
    }) || []

    if (!currentUserId) {
        <p>Loading projects..</p>
    }

    return (
        <div className='requests-wrapper' >
            <h2 className='requests-title'>Projects</h2>
            <div className='requests-cards-grid'>
                {acceptedProjects.length === 0 ? (
                    <p className='n0-projects'>No projects available yet</p>
                ) : (
                    acceptedProjects.map((project) => (
                        <div key={project._id} className='request-card-item'>
                            <div className='request-card-header'>
                                <h3 className='request-name'>{project.name}</h3>
                            </div>
                            <div className='request-card-body'>
                                <div className='request-detail-row'> 
                                    <p className='request-status'>{project.status}</p>
                                </div>
                            </div>

                            <Link to={`/projectslist/${project._id}`} className='actions-container'>
                                <button type='submit' className='btn-accept'> View Details</button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ProjectsList