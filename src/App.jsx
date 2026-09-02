import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route, Navigate } from "react-router"
import { useEffect, useState } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/BusinessOwner/BusDashboard"
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
import ProfileDetailsDev from "./pages/Developer/ProfileDetailsDev"
import * as userService from './services/user'
import ProfileDetailsBus from "./pages/BusinessOwner/ProfileDetailsBus"
import ReceiptDetails from "./pages/BusinessOwner/ReceiptDetails"
import DevDashboard from './pages/Developer/DevDashboard'
import Chats from './Chats'
import ProjectsList from "./pages/Developer/ProjectsList"
import ProjectsDetails from "./pages/Developer/ProjectDetails"
import BusDashboard from "./pages/BusinessOwner/BusDashboard"

const getUserFromToken = () => {
  const token = localStorage.getItem('token')
  if (!token)
    return null
  const decoded = JSON.parse(atob(token.split('.')[1])).payload
  return decoded.payload || decoded.user || decoded
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
        console.error(error)
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
        console.error(error)
      }
    }
    fetchDevelopers()
  }, [])

  useEffect(() => {
    const fetchuserData = async () => {
      const initialUser = getUserFromToken()
      if (initialUser?._id) {
        try {
          const fullUser = await userService.show(initialUser._id)
          setUser(fullUser)
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchuserData()
  }, [])

  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
        <Routes>
          <Route path='/' element={!user ? <Landing /> : developer ? (<DevDashboard user={user} />) : (<BusDashboard user={user} />)} />
          <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
          <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
          <Route path='/business-owner/profile/form' element={businessOwner ? <ProfileForm user={user} setUser={setUser} /> : <Navigate to='/' />} />
          <Route path='/developer/profile/form' element={developer ? <ProfileFormDev user={user} setUser={setUser} /> : <Navigate to='/' />} />
          <Route path='/developer/profile' element={developer ? <ProfileDetailsDev user={user} setUser={setUser} /> : <Navigate to='/' />} />
          <Route path='/projectProposal/form' element={businessOwner ? <ProposalForm setProposals={setProposals} /> : <Navigate to='/' />} />
          <Route path='/projectProposal' element={businessOwner ? <ProposalList proposals={proposals} user={user}/> : <Navigate to='/' />} />
          <Route path='/projectProposal/:projectProposalId' element={businessOwner ? <ProposalDetails proposals={proposals} user={user} setProposals={setProposals} /> : <Navigate to='/' />} />
          <Route path='/developers' element={businessOwner ? <DeveloperList allDevelopers={allDevelopers} /> : <Navigate to='/' />} />
          <Route path='/requests' element={developer ? <Requests proposals={proposals} setProposals={setProposals} user={user} /> : <Navigate to='/' />} />
          <Route path='/projectProposal/form/:developerId' element={businessOwner ? <ProposalForm setProposals={setProposals} /> : <Navigate to='/' />} />
          <Route path='/business-owner/viewDev' element={businessOwner ? <ProfileDetailsDev user={user} setUser={setUser} /> : <Navigate to='/' />} />
          <Route path='/developer/:developerId' element={businessOwner ? <DeveloperDetails developers={allDevelopers} user={user} /> : <Navigate to='/' />} />
          <Route path='/business-owner/profile' element={businessOwner ? <ProfileDetailsBus user={user} setUser={setUser} /> : <Navigate to='/' />} />
          <Route path="/receipt/:proposalId" element={businessOwner ? <ReceiptDetails proposals={proposals} /> : <Navigate to='/' />} />
          <Route path='/chat/:chatId' element={<Chats user={user} />} />
          <Route path='/chat' element={<Chats user={user} />} />
          <Route path='/projectslist' element={developer ? <ProjectsList user={user} proposals={proposals} setProposals={setProposals} /> : <Navigate to='/' />} />
          <Route path='/projectslist/:projectlistId' element={developer ?<ProjectsDetails user={user} proposals={proposals} setProposals={setProposals} /> : <Navigate to='/' />} />
        </Routes>
      </main>
    </div>
  )
}

export default App