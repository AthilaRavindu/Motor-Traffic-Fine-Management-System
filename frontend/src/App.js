import logo from './logo.svg';
import './App.css';
import LoginPage from './view/LoginPage/LoginPage';
import DrawerPage from './Layout/DrawerPage';
import { HashRouter, Route, Routes } from 'react-router-dom';
import DashbordPage from './view/DashBord/DashBordPage';
import UserManagement from './view/UserManagement/UserManagement';
import UserDetails from './view/UserManagement/UserDetails';
import EditUser from './view/UserManagement/EditUser';
import RegisterPage from './view/LoginPage/Register';
import FinesManagement from './view/FinesManagement/FinesManagement';
import { Reports } from './view/Reports/Reports';
import FinesDetails from './view/FinesManagement/FinesDetails';
import EditFines from './view/FinesManagement/EditFines';
import PageHandling from './utils/PageHandling';
import FineIssureForm from './view/FineIssureForm/FineIssureForm';
import PoliceOfficerDash from './view/DashBord/PoliceOfficerDash';
import CivilUserDashboard from './view/CivilUserDashboard/CivilUserDashboard';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayPage from './view/PayPage/PayPage';


const stripePromise = loadStripe("pk_test_51R4iQSGkLYt3RB8kS8p9kWQu4Kx2ZctpbHYYHMstGlerpjY5KP0Wc8WpDlBedSq07izYVm3bYSVD5w8bn8s8S5YZ00NAnrr5y4");

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/handlePage' element={<PageHandling/>}/>
          
          
          <Route path="/" element={<DrawerPage />}>
            <Route path='dashbord' element={<DashbordPage/>}/>
            <Route path='userManagement' element={<UserManagement/>}/>
            <Route path='finesManagement' element={<FinesManagement/>}/>
            <Route path='userdetails' element={<UserDetails/>}/>
            <Route path='editAdmin/:id' element={<EditUser/>}/>
            <Route path='finesdetails' element={<FinesDetails/>}/>
            <Route path='editFines/:fineid' element={<EditFines/>}/>
            <Route path='analyze' element={<Reports/>}/>

            //civil user

            <Route path='fine-issure-page' element={<FineIssureForm/>}/>
            <Route path='civilUserDash' element={<CivilUserDashboard/>}/>
            <Route path='pay/:id' element={<Elements stripe={stripePromise}><PayPage/></Elements>}/>

            //polic officer

            <Route path='dashbord-police-officer' element={<PoliceOfficerDash/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
