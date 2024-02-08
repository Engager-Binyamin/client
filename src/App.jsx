import React, { useEffect } from 'react'
import Layout from './layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
// import Test from './tests/A_MainTest';

export default function App() {
  const notify = () => toast("Wow so easy!");
  let nav = useNavigate()
  useEffect(() => {
      if (!localStorage.getItem('token')) {
          nav('/login');
          return;
      }
      if (!JSON.parse(localStorage.getItem('user'))) {
          nav('/login');
          return;
      }
      // setUser(JSON.parse(localStorage.getItem("user")))
  }, [localStorage.token , localStorage.user])


  return (
    <div>

      <Layout />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      // transition: 'Bounce'
      />
    </div>
  )
}
