const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(account => {
        res.json(account);
    })
    .catch(err => {
        res.status(500).json({message: "Failed to get accounts"});
    })

});

router.get('/:id', (req, res) => {

    const { id } = req.params;

    db('accounts').where({id})
    .then(accounts => {
        const  account  = accounts[0];
        if(account){
            res.json(account);
        } else {
            res.status(404).json({message: "account with the specified ID do not exist"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to get accounts resource"});
    })
});

router.post('/', (req, res) => {


    const toPost = req.body;
    //array of ids
    
    db('accounts').insert(toPost)
    .then(ids => {
            res.json(ids);
    })
    .catch(err => {
        res.status(500).json({message: "Failed to post post"});
    })

});

// router.put('/:id', (req, res) => {

//     const {id} = req.params;
//     const changes = req.body;
//     //UPDATE Posts SET changes.hey = changes.value WHERE id = id;
//     db('posts').where({id}).update(changes)
//     .then(count => {
//         if(count){
//             res.json({updated:count})
//         } else {
//             res.status(404).json({message:"invalid post id"})
//         }

//     })
//     .catch(err =>{
//         res.status(500).json({message:"failed to update post"})
//     }

//     )

// });

// router.delete('/:id', (req, res) => {


//     const {id} = req.params;
   
//     //DELETE from Posts WHERE id = id
//     db('posts').where({id}).del()
//     .then(count => {
//         if(count){
//             res.json({deleted:count})
//         } else {
//             res.status(404).json({message:"invalid post id"})
//         }

//     })
//     .catch(err =>{
//         res.status(500).json({message:"failed to delete post"})
//     }

//     )

// });

module.exports = router;