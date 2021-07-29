const Chart = require('../models/Chart');

const getAllAccounts = (req, res)=>{
    Chart.find((err, accounts)=>{
        if(!err){
            res.status(200).json(accounts);
        } else {
            res.status(500).send(err);
        }
    })
}

const postAccount = (req, res)=>{
    let {name, category, statement} = req.body;
    const newAccont = new Chart({
        name,
        category,
        statement
    });
    newAccont.save((err)=>{
        if(!err){
            res.status(201).send('Successfully added account');
        } else {
            res.status(500).send(err);
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
            res.status(200).json(foundAccount);
        } else {
            res.status(404).json({msg:'No matching account found'})
        }
    })
}


const patchSingleAccount = (req, res)=>{
    Chart.update({name: req.params.account},
        req.body,
        {runValidators: true},
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
patchSingleAccount, deleteSingleAccount}