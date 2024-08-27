import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Room from "./pages/Room"



function App() {

  return (
    <Router>
      {/* <AuthProvider> */}
        <Routes>
          {/* <Route path="/login" element={<LoginPage/>}/> */}
          {/* <Route path="/register" element={<RegisterPage/>}/> */}
          {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/" element={<Room/>}/>
          {/* </Route> */}
        </Routes>
      {/* </AuthProvider> */}
    </Router>
  )
}

export default App