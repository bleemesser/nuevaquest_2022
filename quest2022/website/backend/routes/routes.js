const express = require('express');
const Player = require('../models/Player.js');
const Game = require('../models/Game.js')
const router = express.Router();
const PlayerSchema = require('../models/Player.js');
const GameSchema = require('../models/Game.js');

router.post('/newuser',(req,res) => { // this is not actually used by the frontend, it exists mainly for testing purposes
    // and for use with postman. html forms send data via get using the query portion of the request.
    PlayerSchema.create({name:req.body.name.trim(), email:req.body.email.trim()})
    .then((req) => {
        console.log('added user with name ' + req.body.name)
        res.send('succesfully created user')
    })
    .catch(err => {
        console.error(err)
    })
})

router.get('/getgames',(req,res) => { // also primarily for testing purposes, to read all the games that have been played
    GameSchema.find({})
    .then((games) => {
        console.log('received get request')
        res.send(games)
    })
    .catch(err => {
        console.error(err)
    })
})
router.get('/getplayers',(req,res) => { // used by the frontend to query player data
    PlayerSchema.find({})
    .then((players) => {
        console.log('received get request')
        res.send(players)
    })
    .catch(err => {
        console.error(err)
    })
})

function calculateEloChange(p1name, p2name, p1points, p2points,p1elo, p2elo) { // the backend calculates Elo points
    return new Promise((resolve,reject) => {
        let s = 400;
        let k = 32;
        let totalpoints = parseInt(p1points) + parseInt(p2points);
        console.log('tp: ' + totalpoints);
        let actual1 = p1points / totalpoints;
        console.log('a1 ' + actual1);
        let actual2 = p2points / totalpoints;
        console.log('a2 ' + actual2);
        let elodiff1 = p2elo - p1elo;
        console.log('ed1 ' + elodiff1);
        let elodiff2 = p1elo - p2elo;
        console.log('ed2 ' + elodiff2);
        let expected1 = 1 / (1 + (10 ** (elodiff1 / s)));
        console.log('ex1 ' + expected1);
        let expected2 = 1 / (1 + (10 ** (elodiff2 / s)));
        console.log('ex1 ' + expected2);
        let p1new = p1elo + (k * (actual1 - expected1));
        let p2new = p2elo + (k * (actual2 - expected2));
        console.log(p1new);
        console.log(p2new);
        PlayerSchema.updateOne({name:p1name}, 
            {$set:{rating_points:p1new}}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });

        PlayerSchema.updateOne({name:p2name}, 
            {$set:{rating_points:p2new}}, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
        });
        
    })
}

function getElos(p1name,p2name) {
    return new Promise((resolve, reject) => {
        let elo1 = Number;
        let elo2 = Number;
        PlayerSchema.findOne({name:p1name})
        .then((player) => {
            elo1 = player.rating_points;
        })
        PlayerSchema.findOne({name:p2name})
        .then((player) => {
            elo2 = player.rating_points;
        })
        .then(() => {
            resolve([elo1,elo2])
        })
    })
}

router.get('/newgame', (req,res) => { // rontend queries this to create a record of a game via html form query data
    GameSchema.create({p1name:req.query.p1name.trim(),p2name:req.query.p2name.trim(),p1points:req.query.p1points,p2points:req.query.p2points})
    .then(() => {
        console.log('created new game')
        res.send('<p>Thank you for submitting game results!</p><a href="http://localhost:3000">Go back to main page</a>')
        return req
    })
    .then((req) => {
        getElos(req.query.p1name,req.query.p2name)
        .then((elos) => {
            console.log(elos)
            calculateEloChange(req.query.p1name,req.query.p2name,req.query.p1points,req.query.p2points,elos[0],elos[1])
            // calculateEloChange(req.query.p1name,req.query.p2name,req.query.p1points,req.query.p2points,1000,1000)
        })
    })
})
 
router.get('/newuser',(req,res) => { // same as above get query, except for signing up new players
    PlayerSchema.create({name:req.query.username.trim(),email:req.query.email.trim(),rating_points:1000})
    .then(() => {
        console.log('created new user with name ' + req.query.username)
        res.send('<p>Thank you for signing up! You should see your username on the leaderboard.</p><a href="http://localhost:3000">Go back to main page</a>')
    })
    .catch(err => {
        console.error(err)
        res.send('could not create user')
    })
})

router.put('/changeusername',(req,res) => {
    PlayerSchema.updateOne(
        {name:req.body.name.trim()},
        {name:req.body.newname.trim()})
    .then(req => {
        console.log('updated user')
        res.send('update success')
    })
})

router.delete('/deluser',(req,res) => { // testing purposes, not used by frontend
    PlayerSchema.deleteOne({name:req.body.username}).then(() => {
        console.log('deleted ' + req.body.username)
        res.send('deleted ' + req.body.username)
    })
    .catch(err => {
        console.error(err)
    })
})

router.delete('/clearallgames',(req,res) => { // testing purposes only, remove if actually opened to web (clears all games)
    GameSchema.deleteMany({}).then(() => {
        console.log('deleted all game data!')
        res.send('delete success')
    })
    .catch(err => {
        console.error(err)
    })
})
router.delete('/delallusers',(req,res) => { // testing purposes only, remove if actually opened to web (clears all games)
    PlayerSchema.deleteMany({}).then(() => {
        console.log('deleted all users!')
        res.send('delete success')
    })
    .catch(err => {
        console.error(err)
    })
})

module.exports = router;