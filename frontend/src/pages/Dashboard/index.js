import React,{ useState, useEffect } from 'react'
import api from '../../services/api'
import Header from '../header'
import { Link } from 'react-router-dom'
import { FiChevronsRight, FiEye, FiHeart } from 'react-icons/fi'
import Chef from '../../assets/chef.png'

import './styles.css'

export default function Dashboard(){
    
    const [ recipies, setRecipies ] = useState([])
    
    const userId = localStorage.getItem('id')    

    useEffect(() => {
        api.get("userrecipies", { 
            headers:{
                chefe_id: userId
            } 
        }).then(response => {
            response.data.splice(6)

            setRecipies(response.data)

    })
    }, [userId])

    return(
        <div>
            <Header/>
            
            <div className="content-home--body">
                    <div className="about-foodfy">
                        <section>
                            <h1>As melhores receitas é você quem faz!</h1>
                            <p>Compartilhe com o mundo suas receitas e mostre do que é capaz...</p>
                            <Link to='/manager' className="letsGo" >
                                Ver minhas receitas...
                                <FiChevronsRight size={24} color="rgb(151, 41, 41)"/>
                            </Link>
                        </section>
                        <img src={Chef} alt="Chefe"/>
                    </div>

                    <div className="most-acess">
                        <h1>Suas receitas mais acessadas:</h1>
                        <section>
                            {recipies.map(recipie => (
                                <div className="recipies-dashboard">
                                    <img src={recipie.image} alt="Image Recipie"/>
                                    <h1>{recipie.title}</h1>
                                    <span className="contentsLikes">
                                        <p><FiEye size={18} color="grey"/> {recipie.views}</p>
                                        <p><FiHeart size={18} color="red"/> {recipie.likes}</p>
                                    </span>
                                </div>

                            ))}
                        </section>
                    </div>
                </div>
            </div>
    )
}
