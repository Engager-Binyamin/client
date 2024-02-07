import React from 'react'
import Layout from './layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Test from './tests/A_MainTest';

export default function App() {
  const notify = () => toast("Wow so easy!");

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
      {/* <button onClick={notify}>Notify!</button> */}
    </div>
  )
}
