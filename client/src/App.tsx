import './App.css'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import Reserve from './component/Reserve';
import Confirm_reserve from './component/Confirm_reserve';

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/Reserve"
                    element={ <Reserve /> }
                />
                
                <Route
                    path="/Reserve/Confirm-reserve"
                    element={ <Confirm_reserve /> }
                />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
