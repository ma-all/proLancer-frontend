import { Link } from 'react-router'

const ProjectsList = (props) => {

    const currentUserId = (props.user?._id || props.user)?.toString()

    // const navigate = useNavigate()

    const currentStatus = ['Accepted', 'In Progress', 'Completed']

    const acceptedProjects = props.proposals?.filter((proposal) => {
        const developerId = (proposal.developer?._id || proposal.developer)?.toString()
        return developerId === currentUserId && currentStatus.includes(proposal.status)
    }) || []

    console.log(currentUserId)

    console.log(acceptedProjects)

    return (
        <>
            {acceptedProjects.length === 0 ? (
                <p>No projects available yet</p>
            ) : (
                acceptedProjects.map((project) => (
                    <div key={project._id}>
                        <h3>{project.name}</h3>
                        <p>{project.budget}</p>
                        <p>{project.status}</p>

                        <Link to={`/projectslist/${project._id}`}>
                            <button type='submit'> View Details</button>
                        </Link>
                    </div>
                ))
            )}



        </>
    )
}

export default ProjectsList