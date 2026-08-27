import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, Navigate } from "react-router"
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
import DeveloperList from "./pages/BusinessOwner/DeveloperList"
import * as DevService from './services/developers'
import DeveloperDetails from "./pages/BusinessOwner/DeveloperDetails"
import Requests from "./pages/Developer/Requests"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())

  const [proposals, setProposals] = useState([])

  const [allDevelopers, setAllDevelopers] = useState([])

  const developer = user?.role === 'Developer'
  const businessOwner = user?.role === 'Business Owner'

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

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const data = await DevService.indexDev()
        setAllDevelopers(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDevelopers()
  }, [])

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
          <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />

          <Route path='/business-owner/profile/form' element={businessOwner ? <ProfileForm user={user} setUser={setUser} /> : <Navigate to='/sign-in' />} />
          <Route path='/developer/profile/form' element={developer ? <ProfileFormDev user={user} setUser={setUser} /> : <Navigate to='/sign-in' />} />
          <Route path='/projectProposal/form' element={businessOwner ? <ProposalForm setProposals={setProposals} /> : <Navigate to='/sign-in' />} />


          <Route path='/projectProposal' element={businessOwner ? <ProposalList proposals={proposals} /> : <Navigate to='/sign-in' />} />
          <Route path='/projectProposal/:projectProposalId' element={businessOwner ? <ProposalDetails proposals={proposals} /> : <Navigate to='/sign-in' />} />

          <Route path='/developers' element={businessOwner ? <DeveloperList allDevelopers={allDevelopers}/> : <Navigate to='/sign-in' />} />

          {/* <Route path='/developers/:developerId' element={businessOwner ? <DeveloperDetails /> : <Navigate to='/sign-in' />} /> */}

          <Route path='/requests' element={developer ? <Requests proposals={proposals} setProposals={setProposals} user={user} /> : <Navigate to='/sign-in' />} />
          <Route path='/projectProposal/form/:developerId' element={businessOwner ? <ProposalForm setProposals={setProposals} /> : <Navigate to='/sign-in' />} />

        </Routes>
      </main>
    </div>
  )
}

export default App