import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Devices from './components/pages/Devices';
import Login from './components/pages/Login';
import { AuthProvider, ProtectedRouter } from './lib/auth';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-mono">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AuthProvider>
              <ProtectedRouter>
                <Devices />
              </ProtectedRouter>
            </AuthProvider>
          } />
          <Route path="/login" element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App