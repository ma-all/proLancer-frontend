import { useEffect, useState } from 'react'
import * as proposalService from '../../services/proposal'
import { Link } from 'react-router'

const ProposalList = () => {

    const [proposals, setProposals] = useState([])

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const data = await proposalService.index()
                setProposals(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProposals()
    }, [])

    return (
        <>
            {proposals.map((proposal) =>
                <>
                    <p>{proposal.name}</p>
                    <p>{proposal.budget}</p>

                    <Link to={`/projectProposal/${proposal._id}`}>
                        <button type='submit'> View Details</button>
                    </Link>
                </>
            )}
        </>
    )
}

export default ProposalList