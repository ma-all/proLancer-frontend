import Nav from "./components/Nav"
import SignUpForm from "./pages/SignUpForm"
import './App.css'
import { Routes, Route } from "react-router"
import { useState } from "react"
import SignInForm from "./pages/SignInForm"
import Landing from "./pages/Landing"
import Dashboard from "./pages/BusinessOwner/Dashboard"
import ProposalForm from './pages/BusinessOwner/ProposalForm'



import BusinessOwnerProfile from "./pages/BusinessOwner/BusinessOwnerProfile"
import DeveloperProfile from "./pages/Developer/Profile" 

const getUserFromToken = () => {
  const token = localStorage.getItem('token')

  if (!token) return null

  return JSON.parse(atob(token.split('.')[1])).payload
}

const App = () => {

  const [user, setUser] = useState(getUserFromToken())
  
  return (
    <div>
      <Nav user={user} setUser={setUser} />
      <main className="app-main">
      <Routes>
        <Route path='/' element={user ? <Dashboard user={user} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm setUser={setUser} />} />
        <Route path='/sign-in' element={<SignInForm setUser={setUser} />} />
        <Route path='/projectProposal' element={<ProposalForm />} />
          <Route path='/business-owner/profile'element={<BusinessOwnerProfile user={user} setUser={setUser}/>}/>
        <Route path='/developer/profile' element={<DeveloperProfile user={user}  setUser={setUser}/>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App