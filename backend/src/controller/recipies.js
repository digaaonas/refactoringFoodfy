const conn = require('../database/db')

function compareTokenId(chefe_id, userIdToken){
    const validate = (chefe_id == userIdToken) ? true : false

    return validate
}

module.exports = {
    
    async list(req, res){
        
        try{
                const recipes = await conn.query(`
                SELECT recipies.*,
                 image AS img, 
                 users.name AS chefeName,
                 users.email,
                 users.whatsapp,
                 users.avatar_url
                FROM recipies
                LEFT JOIN users ON users.id = recipies.chefe_id
                ORDER BY recipies.views DESC
            `)

            return res.status(200).json(recipes.rows)
            
        } catch(err){

            return res.status(400).send( err )

        }
    },

    async userList(req, res){
        const { chefe_id } = req.headers

        try{
                const recipies = await conn.query(`
                SELECT * FROM recipies
                WHERE chefe_id = $1
                ORDER BY views DESC
            `, [chefe_id])

            return res.status(200).json(recipies.rows)
            
        } catch(err){

            return res.status(400).send( err )

        }
    },

    async create(req, res){
        const { title, image, ingredients, preparation, infoadd } = req.body
        const { chefe_id } = req.headers

        if(!compareTokenId(chefe_id, req.userId)) 
            return res.status(401).json({ error: 'Operation not permited' })

        const created_at = new Date()
        
        const query = `
            INSERT INTO recipies(
                title,
                image,
                chefe_id,
                ingredients,
                preparation,
                infoadd,
                created_at,
                likes,
                views
            ) VALUES(
                $1, $2, $3, $4, $5, $6, $7, 0, 0
            )
            RETURNING id, image, chefe_id, ingredients, preparation, infoadd, created_at
        `
        const values = [
            title,
            image,
            chefe_id,
            ingredients,
            preparation,
            infoadd,
            created_at
        ]

        try{

            const response = await conn.query(query, values)

            const recipie = response.rows

            return res.status(200).json({ recipie, user: req.userId})

        } catch(err){

            return res.status(400).send(err)

        }

    },

    async delete(req, res){
        const { id } = req.params        
        const { chefe_id } = req.headers

        if(!compareTokenId(chefe_id, req.userId)) 
            return res.status(401).json({ error: 'Operation not permited' })

        try{
            
            const validateRecipe = await conn.query(`
            SELECT * 
            FROM recipies
            WHERE id = $1 AND chefe_id = $2
        `, 
        [id, chefe_id]
        )

        if(!validateRecipe.rowCount) return res.status(400).send( 'Operation not permited' )

        await conn.query(`
            DELETE FROM recipies
            WHERE id = $1 AND chefe_id = $2
        `,
        [id, chefe_id]
        )

        return res.status(200).send()

        } catch(err){
            return res.status(400).send( err )
        }
        
    },

    async put(req, res){
        const { id } = req.params
        const { chefe_id } = req.headers
        const { title, image, ingredients, preparation, infoadd } = req.body

        if(!compareTokenId(chefe_id, req.userId)) 
            return res.status(401).json({ error: 'Operation not permited' })

        try{
            
            const validateRecipe = await conn.query(`
            SELECT * 
            FROM recipies
            WHERE id = $1 AND chefe_id = $2
        `, 
        [id, chefe_id]
        )

        if(!validateRecipe.rowCount) return res.status(400).send( 'Operation not permited' )

        await conn.query(`
            UPDATE recipies
            SET title = $1,
            image = $2,
            ingredients = $3,
            preparation = $4,
            infoadd = $5
            WHERE id = $6 AND chefe_id = $7
        `,
        [ title, image, ingredients, preparation, infoadd, id, chefe_id ]
        )

        return res.status(200).send()

        } catch(err){
            return res.status(400).send( err )
        }
    },

    async likeView(req, res){

        const { like, view, id } = req.query

        const response = await conn.query(`
            SELECT likes, views
            FROM recipies
            WHERE id = $1 
        `, [id])

        const newLike = response.rows[0].likes + like
        const newView = response.rows[0].views + view

        try{
            await conn.query(`
                UPDATE recipies
                SET likes = $1, views = $2
                WHERE id = $3
                RETURNING likes, views
            `, [newLike, newView, id])

                res.status(200).send()

        }catch(err){
            res.status(400).send(err)
        }
    }
}