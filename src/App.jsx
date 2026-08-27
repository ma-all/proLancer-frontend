import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useEffect, useState } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/BusinessOwner/Dashboard"
import ProposalForm from './pages/BusinessOwner/ProposalForm'



import ProfileForm from "./pages/BusinessOwner/ProfileForm"
import ProfileFormDev from "./pages/Developer/ProfileFormDev" 
import ProposalList from './pages/BusinessOwner/ProposalList'
import ProposalDetails from './pages/BusinessOwner/ProposalDetails'
import * as proposalService from './services/proposal'

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

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
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />

          <Route path='/business-owner/profile/form'element={<ProfileForm user={user} setUser={setUser}/>}/>
        <Route path='/developer/profile/form' element={<ProfileFormDev user={user}  setUser={setUser}/>}/>
        <Route path='/projectProposal/form' element={<ProposalForm />} />


        <Route path='/projectProposal' element={<ProposalList proposals={proposals} />}/>
        <Route path='/projectProposal/:projectProposalId' element={<ProposalDetails proposals={proposals} />} />
      </Routes>
      </main>
    </div>
  )
}

export default App