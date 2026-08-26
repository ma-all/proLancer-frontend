import { useNavigate, useParams } from 'react-router'
import * as proposalService from '../../services/proposal'

const ProposalDetails = (props) => {

    const { projectProposalId } = useParams()

    const navigate = useNavigate()

    const proposal = props.proposals?.find((pro) => 
     pro._id === projectProposalId)

    return (
        <>
            <h2>{proposal.name}</h2>
            <p>{proposal.status}</p>
            <p>{proposal.description}</p>
            <p>{proposal.budget}</p>
            <p>{proposal.features}</p>
            <p>{proposal.theme}</p>
        </>
    )
}

export default ProposalDetails