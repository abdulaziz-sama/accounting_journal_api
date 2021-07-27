const Chart = require('../models/Chart');

const getAllAccounts = (req, res)=>{
    Chart.find((err, result)=>{
        if(!err){
            res.send(result);
        } else {
            res.send(err);
        }
    })
}

const postAccount = (req, res)=>{
    let {accountName, accountCategory} = req.body;
    accountName = accountName.toUpperCase();
    const newAccont = new Chart({
        name: accountName,
        category: accountCategory
    });
    newAccont.save((err)=>{
        if(!err){
            res.send('Successfully added account');
        } else {
            res.send(err);
        }
    });   
}

const deleteAllAccounts = (req, res)=>{
    Chart.deleteMany((err)=>{
        if(!err){
            res.send('Successfully deleted all accounts');
        } else {
            res.send(err);            
        }
    })
}

const getSingleAccount = (req, res)=>{
    let account = req.params.account.toUpperCase();
    Chart.findOne({name: account}, (err, foundAccount)=>{
        if(foundAccount){
            res.send(foundAccount);
        } else {
            res.send('No matching account found')
        }
    })
}

const putSingleAccount = (req, res)=>{
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
}

const patchSingleAccount = (req, res)=>{
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
}

const deleteSingleAccount = (req, res)=>{
    const account = req.params.account.toUpperCase();
    Chart.deleteOne({name: account}, (err)=>{
        if(!err){
            res.send('Account deleted successfully')
        } else {
            res.send(err);
        }
    })
}


module.exports = {getAllAccounts, postAccount, deleteAllAccounts, getSingleAccount,
putSingleAccount, patchSingleAccount, deleteSingleAccount}