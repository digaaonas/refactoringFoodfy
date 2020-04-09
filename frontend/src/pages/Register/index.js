import React, { useState } from 'react'
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, StylesProvider } from '@material-ui/core'
import { FiArrowLeft } from 'react-icons/fi'
import Chef from '../../assets/chef.png'
import Logo from '../../assets/logo.png'

import './styles.css'

export default function Logon(){
    const [ name, setName ] = useState('')
    const [ avatar_url, setAvatar_url ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ whatsApp, setWhatsApp ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const [ open, setOpen ] = useState(false)
    const [ dialogText, setDialogText ] = useState('')
    const [ dialogActions, setDialogActions ] = useState('')

    
    const history = useHistory()

    async function handleNewLogin(e){
        e.preventDefault()


        if(password !== confirmPassword) {
            setDialogText('Senhas não coincidem!')
            setDialogActions('Ok Error')
            setOpen(true)
            return
        }
                     
        try{
            const response = await api.post("register", { name, avatar_url, email, whatsApp,password })

            if(response){
                setDialogText('Usuário criado com sucesso!')
                setDialogActions('Ok')
                setOpen(true)
            } 


        }catch(err){
            setDialogText('Erro ao criar usuáio, tente novamente.')
            setDialogActions('Ok Error')
            setOpen(true)

        } 
    }    

    function handleClose(){
        setOpen(false)
        
        if(dialogActions === 'Ok') history.push("/")

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
                    <DialogContentText id="dialog-text">{dialogText}</DialogContentText>

                
                    <DialogActions className="dialog-action">
                        
                        <button className="dialog-button" onClick={handleClose} autoFocus>Ok</button>
                        
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <section className="form">

                <form onSubmit={handleNewLogin}>

                    <img src={Logo} alt="Logo"/>

                    <h1>Cadastre-se</h1>

                    <input
                        className="input"
                        type="text" 
                        placeholder="Nome" 
                        value={name}
                        onChange={e => setName(e.target.value)}    
                    />

                    <input
                        className="input"
                        type="text" 
                        placeholder="Avatar URL" 
                        value={avatar_url}
                        onChange={e => setAvatar_url(e.target.value)}    
                    />

                    <input
                        className="input"
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}    
                    />

                    <input
                        className="input"
                        type="text" 
                        placeholder="WhatsApp" 
                        value={whatsApp}
                        onChange={e => setWhatsApp(e.target.value)}    
                    />

                    <input
                        className="input"
                        type="Password" 
                        placeholder="Password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                    />

                    <input
                        className="input"
                        type="Password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}    
                    />

                    <button type="submit" className="button"> Sing In </button>

                <Link className="links" to="/">
                    <FiArrowLeft size={16} color="black"/>
                    Já tenho cadastro
                </Link>

                </form>

            <img src={Chef} alt="Chef"/>   

            
            </section>

        </div>
    ) 
}