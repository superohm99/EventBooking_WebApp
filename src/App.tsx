import './App.css'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import Reserve from './component/Reserve';


function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/Reserve"
                    element={ <Reserve /> }
                />
                {/* <Route
                    path="/"
                    element={ <Home /> }
                /> */}
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
