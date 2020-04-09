import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import Logo from '../assets/logo.png'

import './styles.css'

export default function Header(){
    const history = useHistory()

    const userName = localStorage.getItem('name')
    const userAvatar = localStorage.getItem('avatar_url')

    function handleLogout(){
        localStorage.clear()

       history.push('/')
    }

    return (
            <header>
                <div className="info-user">
                    <img src={Logo} alt="Logo"/>
                    
                    <div className="home-title">
                        <span> Welcome, {userName}</span>
                    </div>

                    <div>
                        <img src={userAvatar} alt="Avatar" className="avatar"/>
                        <Link onClick={handleLogout} className="link-logout">
                            <FiLogOut size={25} color="black"/>
                            Sair
                        </Link>
                    </div>                    

                </div>                                     
                
            </header>
    )
}