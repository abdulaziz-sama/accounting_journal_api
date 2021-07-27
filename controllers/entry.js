const Entry = require('../models/Entry');
const {entryValidator} = require('../utility/validation');

const getEntry = (req, res)=>{
    Entry.find((err, entries)=>{
        if(!err){
            res.send(entries)
        } else {
            res.send(err)
        }
    })
}

const postEntry = async (req, res)=>{
    const {debit_accounts, credit_accounts, description, correction_entry} = req.body;
    const validation = await entryValidator(debit_accounts, credit_accounts, correction_entry);
    if(validation){
    const newEntry = new Entry({
        description: description,
        debit_accounts: debit_accounts,
        credit_accounts: credit_accounts    
    });
    newEntry.save((err)=>{
        if(!err){
            res.send('entry created successfully')
        } else {
            res.send(err)
        }
    });
} else {
    res.send('Wrong values entered');
}
}

const deleteEntry = (req, res)=>{
    Entry.deleteMany((err)=>{
        if(!err){
            res.send('all entries deleted successfully')
        } else {
            res.send(err)
        }
    })
}


module.exports = {getEntry, postEntry, deleteEntry}