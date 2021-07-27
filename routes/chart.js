const express = require('express');
const router = express.Router();
const Chart = require('../models/Chart');
const {getAllAccounts, postAccount, deleteAllAccounts} = require('../controllers/chart')


// handling requests to query all accounts, post account or delete all accounts
router.route('/').get(getAllAccounts).post(postAccount).delete(deleteAllAccounts);

// requests targeting a single account
// getting an account
router.route('/:account')
.get((req, res)=>{
    let account = req.params.account.toUpperCase();
    Chart.findOne({name: account}, (err, foundAccount)=>{
        if(foundAccount){
            res.send(foundAccount);
        } else {
            res.send('No matching account found')
        }
    })

})
.put((req, res)=>{
    const account = req.params.account.toUpperCase();
    let {accountName, accountCategory} = req.body;
    accountName = accountName.toUpperCase();

    Chart.update({name: account},
        {name: accountName, category: accountCategory},
        {overwrite: true},
        (err)=>{
            if(!err){
                res.send('successfully updted account')
            } else {
                res.send(err);
            }
        })
})
.patch((req, res)=>{
    const account = req.params.account.toUpperCase();
    const {accountCategory} = req.body;    
    Chart.update({name: account},
        {$set: {category: accountCategory}},
        (err)=>{
            if(!err){
                res.send('successfully updated account')
            } else {
                res.send(err);
            }
        })

})
.delete((req, res)=>{
    const account = req.params.account.toUpperCase();
    Chart.deleteOne({name: account}, (err)=>{
        if(!err){
            res.send('Account deleted successfully')
        } else {
            res.send(err);
        }
    })
})

module.exports = router;