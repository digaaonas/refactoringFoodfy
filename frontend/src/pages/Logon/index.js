import React, { useState } from 'react'
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, StylesProvider } from '@material-ui/core'
import { FiUpload } from 'react-icons/fi'
import Chef from '../../assets/chef.png'
import Logo from '../../assets/logo.png'

import './styles.css'

export default function Logon(){
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ open, setOpen ] = useState(false)

    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('authenticate', { email, password})
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('name', response.data.user.name)
            localStorage.setItem('avatar_url', response.data.user.avatar_url)
            localStorage.setItem('token', response.data.token)

            history.push('/dashboard')

        }catch(err){
            setOpen(true)

        } 
    }

    function handleClose(){
        setOpen(false)
        
    }

    return (
        <div className="logon-container">

            <Dialog
            className="dialog"
            open={open}
            onClose={handleClose}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-text"
            >
                <DialogContent className="dialog-content">
                    <DialogContentText id="dialog-text">Erro ao efetuar Login!</DialogContentText>

                
                    <DialogActions className="dialog-action">
                        
                        <button className="dialog-button" onClick={handleClose} autoFocus>Ok</button>
                        
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <section className="form">

                <form onSubmit={handleLogin}>

                    <img src={Logo} alt="Logo"/>

                    <h1>Faça seu Login</h1>

                    <input
                        className="input"
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />

                    <input
                        className="input"
                        type="Password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                    />

                    <button type="submit" className="button"> Entrar </button>

                <Link className="links" to="/newregister">
                    <FiUpload size={16} color="black"/>
                    Não tenho cadastro
                </Link>

                </form>

            <img src={Chef} alt="Chef"/>   

            
            </section>

        </div>
    ) 
}