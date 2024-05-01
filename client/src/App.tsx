import './App.css'
import { 
  BrowserRouter, Routes, Route, useNavigate 
} from "react-router-dom";
import Reserve from './component/Reserve';
import Confirm_reserve from './component/Confirm_reserve';
import Saveticket from './component/Saveticket';
import Login from './component/Login';
import Receipt from './component/Receipt';
import Register from './component/Register';

import Myticket from "./component/Myticket";
import History from "./component/History";
import Edit from "./component/Edit";
import ChangePasswd from "./component/Changepasswd";

import Home from './component/Home';

function App() {

  return (
    <>
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={ <Home/> }
                />

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

                <Route path="/Profile/Myticket" element={<Myticket />} />
                <Route path="/Profile/History" element={<History />} />
                <Route path="/Profile/" element={<Edit />} />
                <Route path="/Profile/Changepasswd" element={<ChangePasswd />} />

            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
