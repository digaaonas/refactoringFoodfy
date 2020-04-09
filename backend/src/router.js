const express = require('express')
const recipiesController = require('./controller/recipies')
const authenticateController = require('./controller/authenticate') 
const router = express.Router()
const {celebrate, Segments, Joi} = require('celebrate')
const authMiddleware = require('./middlewares/auth')

router.post('/register', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsApp: Joi.string().required(),
        password: Joi.string().required(),
        avatar_url: Joi.string()        
    })
}), authenticateController.create)

router.post('/authenticate', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
}), authenticateController.auth)

router.get('/recipies', recipiesController.list)

router.get('/userrecipies', celebrate({
    [Segments.HEADERS]: Joi.object({
        chefe_id: Joi.number().required()
    }).unknown()
}),recipiesController.userList)

router.post('/recipies', authMiddleware, celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        image: Joi.string().required(),
        ingredients: Joi.required(),
        preparation: Joi.required(),
        infoadd: Joi.string()
    }),
    [Segments.HEADERS]: Joi.object({
        chefe_id: Joi.number().required()
    }).unknown()
}), recipiesController.create)

router.get('/likerecipie', celebrate({
    [Segments.QUERY]: {
        id: Joi.required(),
        like: Joi.number().required(),
        view: Joi.number().required()
    }
}),recipiesController.likeView)

router.put('/recipies/:id', authMiddleware, celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        image: Joi.string().required(),
        ingredients: Joi.required(),
        preparation: Joi.required(),
        infoadd: Joi.string()
    }),
    [Segments.HEADERS]: Joi.object({
        chefe_id: Joi.required()
    }).unknown(),
    [Segments.PARAMS]: {
        id: Joi.required()
    }
}), recipiesController.put)

router.delete('/recipies/:id', authMiddleware, celebrate({
    [Segments.PARAMS]: {
        id: Joi.number().required()
    },
    [Segments.HEADERS]: Joi.object({
        chefe_id: Joi.number().required()
    }).unknown()
}),recipiesController.delete)

module.exports = router