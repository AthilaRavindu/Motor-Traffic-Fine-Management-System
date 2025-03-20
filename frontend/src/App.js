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


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/handlePage' element={<PageHandling/>}/>
          <Route path='/fine-issure-page' element={<FineIssureForm/>}/>
          <Route path="/" element={<DrawerPage />}>
            <Route path='dashbord' element={<DashbordPage/>}/>
            <Route path='userManagement' element={<UserManagement/>}/>
            <Route path='finesManagement' element={<FinesManagement/>}/>
            <Route path='userdetails' element={<UserDetails/>}/>
            <Route path='editAdmin/:id' element={<EditUser/>}/>
            <Route path='finesdetails' element={<FinesDetails/>}/>
            <Route path='editFines/:fineid' element={<EditFines/>}/>
            <Route path='analyze' element={<Reports/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
