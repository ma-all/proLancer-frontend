import { useState } from 'react'
import { Link } from 'react-router'
import { Funnel } from 'lucide-react'

const ProposalList = (props) => {

    const currentUserId = (props.user?._id || props.user?.id || props.user)?.toString()

    const [sFilter, setSFilter] = useState('All')

    //keeping this here because i might need it later
    const filterproposals = props.proposals?.filter((proposal) => {
        const ownerId = (proposal.businessOwner?._id || proposal.businessOwner?.id || proposal.businessOwner)?.toString()
        // return ownerId === currentUserId
        const matched = ownerId === currentUserId

        if (sFilter === 'All')
            return matched
        if (sFilter === 'Current')
            return matched && ['Pending', 'Accepted', 'Rejected', 'In Progress', 'Completed'].includes(proposal.status)
        return matched && proposal.status === sFilter
    })

    const handleChange = (event) => {
        setSFilter(event.target.value)
    }

    return (
        <>
            <h2>Proposals</h2>
            <div className='proposals-filter-container'>
                <div className='filter-part'>
                    <select value={sFilter} onChange={handleChange} className='filter-select'>
                        <option value='All'>All</option>
                        <option value='Pending'>Pending</option>
                        <option value='Accepted'>Accepted</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                    </select>
                    <Funnel size={18} className='filter-icon' />
                </div>
            </div>
            <div className='proposal-list-container'>
                {filterproposals.map((proposal) =>
                    <div key={proposal._id} className='proposal-list-card'>
                        <div className='proposal-name-status'>
                        <p className='proposal-list-name'>{proposal.name}</p>
                        {/* <p>{proposal.status}</p> */}
                        </div>

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