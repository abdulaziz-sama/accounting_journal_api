const Entry = require('../models/Entry');
const {entryValidator} = require('../utility/validation');
const postToLedger = require('../utility/ledger_creator')

const getEntry = (req, res)=>{
    Entry.find((err, entries)=>{
        if(!err){
            res.status(200).json(entries)
        } else {
            res.status(500).send(err)
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
    newEntry.save((err, entry)=>{
        if(!err){
            postToLedger(debit_accounts, credit_accounts, entry.date, entry._id)
            res.status(201).send('entry created successfully')
        } else {
            res.status(500).send(err)
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