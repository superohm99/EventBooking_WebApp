import './App.css'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import Reserve from './component/Reserve';
import Saveticket from './component/Saveticket';


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
                 <Route
                    path="/Saveticket"
                    element={ <Saveticket /> }
                />
            </Routes>
        </BrowserRouter>
        
    </>
  )
}

export default App
