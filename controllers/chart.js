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


module.exports = {getAllAccounts, postAccount, deleteAllAccounts}