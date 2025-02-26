import { useState, useEffect } from 'react'; 
import AppNavBar from './components/AppNavBar';
import AdminView from './components/AdminView'

// acquire the pages that will make up the app
import Home from './pages/Home';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import Catalog from './pages/Products';
import ErrorPage from './pages/Error';
import ProductView from './pages/ProductView';
import Logout from './pages/Logout';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import AllProducts from './pages/AllProducts'
import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';

function App() {

  const [user, setUser] = useState({
    id: null, 
    isAdmin: null     
  });

  const unsetUser = () => {
    localStorage.clear(); 
    setUser({
       id: null,
       isAdmin: null
    }); 
  }


   useEffect(() => {

      let token = localStorage.getItem('accessToken');

      fetch('https://immense-fortress-37269.herokuapp.com/users/profile', {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      .then(res => res.json())
      .then(convertedData => {
        if (typeof convertedData._id !== "undefined") {
          setUser({
             id: convertedData._id, 
             isAdmin: convertedData.isAdmin
          });
        } else {
           setUser({
             id: null, 
             isAdmin: null
          });
        }
      }); 

  },[user]);


  return (
    <div>
       <UserProvider value={{user, setUser, unsetUser}}>
          <Router>
            <AppNavBar/>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path="/products" element={<Catalog />} />
                <Route path='/products/all' element={<AllProducts />} />
                <Route path='/login' element={<LoginPage/>} />
               <Route path='/logout' element={<Logout />} />
               <Route path='/products/view/:id' element={<ProductView/>} />
               <Route path='/admin' element={<AdminView />} />

               <Route path='/products/add' element={<AddProduct />} />
               <Route path='/products/all/update/:id' element={<UpdateProduct />} />
               <Route path="*" element={<ErrorPage/>} />
               </Routes>
          </Router>
      </UserProvider>
    </div>
  );
}

export default App;
