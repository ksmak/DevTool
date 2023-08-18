import { Route, Routes } from 'react-router-dom'
import { ProtectedRouter } from './components/hoc/ProtectedProvider';
import Devices from './components/pages/Devices';
import Login from './components/pages/Login';

const App = () => {
  return (
    <div className="container mx-auto flex flex-col min-h-screen font-mono">
      <Routes>
        <Route path="/" element={
          <ProtectedRouter>
            <Devices />
          </ProtectedRouter>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App