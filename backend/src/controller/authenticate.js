const conn = require('../database/db')
const bcrypt = require('bcryptjs')
const authConfig = require('../config/auth.json')
const jwt = require ('jsonwebtoken')

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async create(req, res){
        
        try{
            
            let {name, email, whatsApp, password, avatar_url} = req.body

            const userEmail = await conn.query(`
                SELECT email 
                FROM users 
                WHERE email = $1
            `, 
            [email]
            )

            if(userEmail.rowCount) 
                return res.status(400).json(' User Exist ')

            const hash = await bcrypt.hash(password, 10)
            password = hash

            const created_at = new Date()

            const query = `
                INSERT INTO users(
                    name,
                    email,
                    whatsapp,
                    password,
                    avatar_url,
                    created_at                    
                ) VALUES(
                    $1, $2, $3, $4, $5, $6
                )
                RETURNING id, name, avatar_url
            `

            const values = [ name, email, whatsApp, password, avatar_url, created_at  ]

            const newUser = await conn.query(query, values)
            const user = newUser.rows[0]

            const token = generateToken({ id: newUser.rows[0].id })

            return res.status(200).json( { user, token } )

        }catch(err){

            return res.status(400).send( err )

        }
        
    },

    async auth(req, res){
        const { email, password } = req.body

        try{
            const findUser = await conn.query(`
            SELECT *
            FROM users
            WHERE email = $1
            `,[email])

            if(!findUser.rowCount) return res.status(400).json({ error: 'User not found' })

            if(!await bcrypt.compare(password, findUser.rows[0].password)) return res.status(400).json({ error: 'Password is different' })

            findUser.rows[0].password = undefined

            const user = findUser.rows[0]

            const token = generateToken({ id: findUser.rows[0].id })
            
            return res.status(200).json( {user,  token} )
        
        } catch(err){
            return res.status(400).send(err)
        }
    }
}