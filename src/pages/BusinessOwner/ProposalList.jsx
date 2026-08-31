import { useEffect, useState } from 'react'
import * as proposalService from '../../services/proposal'
import { Link } from 'react-router'

const ProposalList = (props) => {

    const currentUserId = (props.user?.id || props.user?.id || props.user)?.toString()

    //keeping this here because i might need it later
    const proposals = props.proposals?.filter((proposal) => {
        const ownerId = (proposal.businessOwner?._id || proposal.businessOwner?.id || proposal.businessOwner)?.toString()
        return ownerId === currentUserId
    })

    return (
        <>
            <h2>Proposals</h2>
            <div className='proposal-list-container'>
                {props.proposals.map((proposal) =>
                    <div key={proposal._id} className='proposal-list-card'>
                        <p className='proposal-list-name'>{proposal.name}</p>
                        {/* <p className='proposal-list-budget'>{proposal.budget}</p> */}

                        <Link to={`/projectProposal/${proposal._id}`}>
                            <button type='submit' className='proposal-list-button'> View Details</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProposalList