import React, { useEffect, useState } from "react"
import DataContext from "./DataContext"
import api from "../functions/api"
import { useNavigate } from "react-router"
import io from "socket.io-client"

export function ManageContext({ children }) {
  const [user, setUser] = useState({})
  const [PopUp, setPopUp] = useState(false)
  const [allCamps, setAllCamps] = useState([])
  const [usersObj, setUsersObj] = useState({})
  // const [] = useState()
  const nav = useNavigate()
  const [socket, setSocket] = useState()

  useEffect(() => {
    if (localStorage.token && !user._id) {
      const tokenToUser = async () => {
        await api.get("/accout/tokenToUser").then((res) => setUser(res))
      }
      tokenToUser()
    } else {
    }
  }, [])

  useEffect(() => {
    let userId = user._id
    if (userId) {
      setSocket(
        io("http://localhost:3000", {
          auth: {
            userData: {
              _id: userId,
              name: user.name,
            },
          },
        })
      )
    }
  }, [user._id])
const [queueJob, setQueueJob] = useState() 
  useEffect(()=>{
    if(socket){
      socket.on('connect', () => {
        console.log('Connected to server of whatsapp');
        socket.emit('queue')
      });
      socket.on(`queue`, (queue) => {
        setQueueJob(queue)
      })
    }
    
    return ()=>{
        if(socket)
        socket.disconnect()
      }
    },[socket])

  const getAllCamps = () => {
    api.get(`/campaign`).then((res) => {
      setAllCamps(res)
    })
  }

  return (
    <DataContext.Provider
      value={{
        user,
        setUser,
        PopUp,
        setPopUp,
        allCamps,
        setAllCamps,
        getAllCamps,
        socket,
        queueJob,
        usersObj,
        setUsersObj,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
