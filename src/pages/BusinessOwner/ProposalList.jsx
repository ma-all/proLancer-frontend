import { useEffect, useState } from 'react'
import * as proposalService from '../../services/proposal'
import { Link } from 'react-router'

const ProposalList = (props) => {

    return (
        <div className='proposal-list-container'>
            {props.proposals.map((proposal) =>
                <div className='proposal-list-card'>
                    <p className='proposal-list-name'>{proposal.name}</p>
                    {/* <p className='proposal-list-budget'>{proposal.budget}</p> */}

                    <Link to={`/projectProposal/${proposal._id}`}>
                        <button type='submit' className='proposal-list-button'> View Details</button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default ProposalList