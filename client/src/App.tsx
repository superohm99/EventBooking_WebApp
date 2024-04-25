import './App.css'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import Reserve from './component/Reserve';
import Confirm_reserve from './component/Confirm_reserve';
import Saveticket from './component/Saveticket';
import Login from './component/Login';
import Signup from './component/Signup';
import Receipt from './component/Receipt';
import Register from './component/Register';


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

                <Route
                    path="/Saveticket"
                    element={ <Saveticket /> }
                />

                <Route
                    path="/Signin"
                    element={ <Login /> }
                />
                <Route
                    path="/Signup"
                    element={ <Register /> }
                />

                <Route
                    path="/Receipt"
                    element={ <Receipt /> }
                />

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
