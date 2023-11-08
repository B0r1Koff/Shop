import { useState } from 'react'
import Home from './components/Home/Home'
import Registration from './components/Registration/Registration'
import Authorization from './components/Authorization/Authorization'
import {Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Routes>
          <Route path="*" element={<Registration />}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/authorization" element={<Authorization />}></Route>
        </Routes>
      </div>
  )
}

export default App
