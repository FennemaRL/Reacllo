
import {useState, useEffect} from  "react"
import { useHistory } from "react-router-dom"

export let closeSession=() => {
    localStorage.removeItem("UserToken")
    localStorage.removeItem("userName")
}
export let getUserName=() => localStorage.getItem("userName") || process.env.REACT_APP_DEFAULT_USER

export let getToken=() => localStorage.getItem("UserToken") || process.env.REACT_APP_DEFAULT_TOKEN

export let openSession=(userName, token) => {
    closeSession()
    localStorage.setItem("userName", userName)
    localStorage.setItem("UserToken", token)
}
export let GetBoard= ()=>{
    const [board, setBoard] = useState('')
    let history = useHistory()
    useEffect(() => {
        setBoard( history.location.pathname.split('/')[3])
    }, [history.location.pathname])
   return board
}
export let getUrl = ()=> process.env.REACT_APP_DEFAULT_URLBACKEND;