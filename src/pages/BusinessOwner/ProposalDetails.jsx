import { useNavigate, useParams } from 'react-router'
import * as proposalService from '../../services/proposal'

const ProposalDetails = (props) => {

    const { projectProposalId } = useParams()

    const navigate = useNavigate()

    const proposal = props.proposals?.find((pro) =>
        pro._id === projectProposalId)

    return (
        <div className='proposal-details-container'>
            <div className='proposal-details-card'>
                <div className='proposal-details-top'>
                    <h2>{proposal.name}</h2>
                    <p>{proposal.status}</p>
                </div>
                <hr />
                <div className='proposal-details-rest'>
                    <div className='proposal-details'>
                        Description:
                        <p>{proposal.description}</p>
                    </div>

                    <div className='proposal-details'>
                        Budget:
                        <p>{proposal.budget}</p>
                    </div>

                    <div className='proposal-details'>
                        Features:
                        <p>{proposal.features}</p>
                    </div>

                    <div className='proposal-details'>
                        Theme:
                        <p>{proposal.theme}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProposalDetails