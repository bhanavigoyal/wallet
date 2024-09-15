import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { CreateWallet } from './Pages/CreateWallet'
import { ImportWallet } from './Pages/ImportWallet'
import { ImportPrivateKey } from './Pages/ImportPrivateKey'
import { ImportMnemonic } from './Pages/ImportMnemonic'
import { Dashboard } from './Pages/Dashboard'
import { Login } from './Pages/Login'
import { AuthProvider } from './components/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {

  return<AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/createwallet' element={<CreateWallet/>}/>
      <Route path='/importwallet' element={<ImportWallet/>}/>
      <Route path='/importwallet/privatekey' element={<ImportPrivateKey/>}/>
      <Route path='/importwallet/mnemonic' element={<ImportMnemonic/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard/>}/>}/>
    </Routes>
    </BrowserRouter>
  </AuthProvider>
}

export default App
