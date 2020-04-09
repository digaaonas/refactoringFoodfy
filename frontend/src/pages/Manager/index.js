import React, {useState, useEffect} from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Header from '../header'
import { FiArrowRight, FiTrash2, FiRefreshCcw, FiPlusSquare, FiChevronsLeft, FiSave } from 'react-icons/fi'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, StylesProvider } from '@material-ui/core'


import './styles.css'

export default function Manager(){

    const token = `Bearer ${localStorage.getItem('token')}`
    const userId = localStorage.getItem('id')

    const [ recipies, setRecipies ] = useState([])
    const [ managerRecipie, setManagerRecipie ] = useState({})
    const [ managerIngredients, setManagerIngredients ] = useState('')
    const [ managerPreparation, setManagerPreparation ] = useState('')

    const [ title, setTitle] = useState('') 
    const [ image, setImage] = useState('') 
    const [ infoadd, setInfoadd] = useState('')
    
    const [ open, setOpen ] = useState(false)
    const [ dialogText, setDialogText ] = useState('')
    const [ dialogActions, setDialogActions ] = useState('')
    
    useEffect(() => {
        api.get("userrecipies", {
            headers:{
                chefe_id: userId
            }
        }).then(response => {
            setRecipies(response.data)
        })
    }, [userId])

    function handleManagerRecipie(id){
        const recipieId = id
        
        const foundRecipie = recipies.find(recipie =>
            recipie.id == recipieId
        )
        
        setManagerRecipie(foundRecipie)
         
        const newIngredients = foundRecipie.ingredients.toString()
        const newPreparation = foundRecipie.preparation.toString()
         
            
        setManagerIngredients(newIngredients)
        setManagerPreparation(newPreparation)
        
        setTitle(foundRecipie.title)
        setImage(foundRecipie.image)
        setInfoadd(foundRecipie.infoadd)

    }

    async function handleDelete(){
        
        setOpen(false)
        
        try{
            await api.delete(`recipies/${managerRecipie.id}`, {
                headers:{
                    chefe_id: userId,
                    Authorization: token
                }
            })

            setDialogText(`Receita deletada com sucesso`)
            setDialogActions('Ok')
            setOpen(true)

        } catch(err){
            setDialogText(`Erro ao deletar receita, tente novamente.`)
            setDialogActions('Ok Error')
            setOpen(true)
        }
    }

    async function handlePutPlus(e){
        e.preventDefault()

        const ingredients = managerIngredients.split(',')
        const preparation = managerPreparation.split(',')
        
        const ingredientsTrim = []
        const preparationTrim = []

        for (let item of ingredients){
            const oneIngredients = item.trim()
            ingredientsTrim.push(oneIngredients)
        }

        for (let item of preparation){
            const onePreparation = item.trim()
            preparationTrim.push(onePreparation)
        }
        
        const data = {
            title,
            image,
            ingredients: ingredientsTrim,
            preparation: preparationTrim,
            infoadd
        }
        
                
        if(managerRecipie.id !== "0"){

            try{
                await api.put(`recipies/${managerRecipie.id}`, data,{
                    headers:{
                        chefe_id: userId,
                        Authorization: token
                    }
                })

                setDialogActions('Ok')
                setDialogText(`Receita atualizada com sucesso.`)
                setOpen(true)
                
            } catch(err){
                setDialogText(`Erro ao atualizar receita, tente novamente`)
                setDialogActions('Ok Error')
                setOpen(true)

            }
        }

        if(managerRecipie.id === "0"){

            try{
                await api.post(`recipies`, data,{
                    headers:{
                        chefe_id: userId,
                        Authorization: token
                    }
                })

                setDialogText(`Receita criada com sucesso`)
                setDialogActions('Ok')
                setOpen(true)
                
            } catch(err){
                setDialogText(`Erro ao criar receita, tente novamente`)
                setDialogActions('Ok Error')
                setOpen(true)

            }
        }
    }

    async function handlePutList(){
        const response = await api.get("userrecipies", {
            headers:{
                chefe_id: userId
            }
        })
            setRecipies(response.data)
        
    }

    function newRecipie(){
        let newRecipie = {
            id: "0",
            title: "Título da receita",
            image: "URL da imagem",
            ingredients: "Separe os ingredientes por vírgula (,)",
            preparation: "Separe os meio de preparação por vírgula (,)",
            infoadd: "Informações complementares da Receita"
        }

        setManagerRecipie(newRecipie)
        setManagerIngredients(newRecipie.ingredients)
        setManagerPreparation(newRecipie.preparation)
        setImage('')
    }

    function handleOpenDelete(){

        setDialogText(`Deseja realmente deletar a receita: ${managerRecipie.title}`)
        setDialogActions('YesNo')
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)

        if(dialogActions === "Ok"){
            handlePutList()
            window.document.querySelector('form').reset()
            setManagerRecipie({})
            setManagerIngredients('')
            setManagerPreparation('')
            setTitle('') 
            setImage('') 
            setInfoadd('')
            
        }
    }

    return (
        <div>
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
                        
                        <button className={dialogActions === "YesNo" ? "dialog-button" : "dialog-button disable"} onClick={handleDelete} >Sim</button>
                        <button className={dialogActions === "YesNo" ? "dialog-button" : "dialog-button disable"} onClick={handleClose} autoFocus>Não</button>
                        <button className={dialogActions === "Ok" || dialogActions === "Ok Error" ? "dialog-button" : "dialog-button disable"} onClick={handleClose} autoFocus>Ok</button>
                        
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Header/>
            <div className="index-recipie">
                        <Link className="back-dashboard" to='/dashboard'>
                            <FiChevronsLeft size={22} color="rgb(87, 82, 82)"/>
                            Dashboard
                        </Link>
                        <h1>Gerencie suas receitas:</h1>
                        <div className="button-manager">
                            <button className={managerRecipie.id !== "0" ? 'button-up' : 'button-douw'} type="submit" form="form-recipie"><FiRefreshCcw className={managerRecipie.id ? 'button-up' : 'button-douw'} size={24} color="rgb(87, 82, 82)"/></button>
                            <button className={managerRecipie.id === "0" ? 'button-up' : 'button-douw'} type="submit" form="form-recipie"><FiSave className={managerRecipie.id == "0" ? 'button-up' : 'button-douw'} size={24} color="rgb(87, 82, 82)"/></button>
                            <FiTrash2 className={managerRecipie.id === "0" || !managerRecipie.id ? 'button-douw' : 'button-up' } size={24} color="rgb(87, 82, 82)" onClick={handleOpenDelete}/>

                        </div>

                </div>
            <div className="content-body">                

                <section >                    

                    <div className="list-recipies">
                        
                        <div className="recipies-manager" onClick={newRecipie}>
                        <Link className="open-panel button-insert">
                            Nova receita 
                            <FiPlusSquare size={22} color="rgb(87, 82, 82)"/>
                        </Link>
                        </div>

                        {recipies.map(recipie => (
                        <div className="recipies-manager">
                        <h2 className={recipie.id == managerRecipie.id ? 'selected' : '' }>{recipie.title}</h2>
                        <Link className="open-panel" onClick={() => handleManagerRecipie(recipie.id)}>
                            Expandir 
                            <FiArrowRight size={18} color="rgb(87, 82, 82)"/>
                        </Link>
                        </div>
                        ))}

                    </div>
                </section>

                <section className="apresentation-recipie">
                        <div className={!managerRecipie.id ? 'visible' : 'invisible'}>
                            <h1>Painel de Apresentação</h1>
                        </div>        
                            
                        <div className={managerRecipie.id ? 'form form-up' : 'form'}>

                            {managerRecipie.id !== '0' || image !== '' ? <img src={image ? image : managerRecipie.image} alt="Foto"/> :'' }
                            
                            <form id="form-recipie" onSubmit={handlePutPlus}>
                                <input
                                    placeholder={managerRecipie.title}
                                    onChange={e => e.target.value == '' ? setTitle(managerRecipie.title) : setTitle(e.target.value)}
                                />
                                <input 
                                    placeholder={managerRecipie.image}
                                    onChange={e => e.target.value == '' ? setImage(managerRecipie.image) : setImage(e.target.value)}
                                />
                                <div>
                                    <div>
                                        <p>Ingredientes</p>
                                        <textarea
                                            placeholder={managerIngredients}
                                            onChange={e => e.target.value === '' ? setManagerIngredients(managerIngredients) : setManagerIngredients(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <p>Modo de Preparo</p>                                    
                                        <textarea 
                                            placeholder={managerPreparation}
                                            onChange={e => e.target.value === '' ? setManagerPreparation(managerPreparation) : setManagerPreparation(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <p>Informações Adicionais</p>
                                    
                                        <textarea 
                                            placeholder={managerRecipie.infoadd}
                                            onChange={e => e.target.value == '' ? setInfoadd(managerRecipie.infoadd) : setInfoadd(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                </section>
            </div>
        </div>
    )
}