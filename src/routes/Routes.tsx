import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../page/404/NotFound';
import Home from '../page/home/Home';
import Landing from '../page/landing/Landing';
import Login from '../page/login/Login';
import SignUp from '../page/signup/SignUp';
import Auth from '../auth/Auth';
import Store from '../store/Store';
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/get-started/' element={<Landing />} />
      <Route path='/signup/*' element={<SignUp />} />
      <Route
        path='/login/*'
        element={
          <Store>
            <Login />
          </Store>
        }
      />

      <Route
        path='/*'
        element={
          <Store>
            <Auth>
              <Home />
            </Auth>
          </Store>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
