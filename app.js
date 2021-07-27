const express = require("express");
const mongoose = require('mongoose');
const chart = require('./routes/chart');
const Chart = require('./models/Chart');

const app = express();
app.use(express.json());
app.use('/chart', chart);

mongoose.connect("mongodb://localhost:27017/accounting_api", {
  useNewUrlParser: true,  useUnifiedTopology: true 
});


const entryAccountSchema = mongoose.Schema({
    account: {type: String, required: true},
    value: {type: Number, required: true}
});

//Entry schema and model
const entrySchema = mongoose.Schema({
    date: {type: Date, default: Date.now},
    description: {type: String, required: true},
    correction_entry: {type: Boolean, default: false},
    debit_accounts: {type: [entryAccountSchema], required: true},
    credit_accounts: {type: [entryAccountSchema], required: true}
});

const Entry = mongoose.model("Entry", entrySchema);

/*
.. validting entries ..
*/

const entryValidator = async (debit_accounts, credit_accounts, correction_entry)=>{
    const accountsValidation = await validateAccounts(debit_accounts, credit_accounts);
    const valuesValidation = validateValues(debit_accounts, credit_accounts, correction_entry);

    return (accountsValidation && valuesValidation);

}

const validateAccounts = async(debit_accounts, credit_accounts)=>{
    for(i = 0; i < debit_accounts.length; i++){
        let accountInChart = await Chart.exists({name: debit_accounts[i].account});
        if(!accountInChart){
            return false;
        }
    }
    for(i=0; i < credit_accounts.length; i++){
        let accountInChart = await Chart.exists({name: credit_accounts[i].account});
        if(!accountInChart){
            return false;
        }

    }
    return true;
}

const validateValues = (debit_accounts, credit_accounts, correction_entry)=>{
    let debitValues = 0;
    let creditValues = 0;
    for(i=0 ; i< debit_accounts.length; i++){
        debitValues += debit_accounts[i].value;
    }
    for(i=0; i < credit_accounts.length; i++){
        creditValues += credit_accounts[i].value;
    }
    return ((debitValues === creditValues) || correction_entry);
}

// handling requests to query all journal entries
app.route('/entry')
.get((req, res)=>{
    Entry.find((err, entries)=>{
        if(!err){
            res.send(entries)
        } else {
            res.send(err)
        }
    })
})
.post(async (req, res)=>{
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

})
.delete((req, res)=>{
    Entry.deleteMany((err)=>{
        if(!err){
            res.send('all entries deleted successfully')
        } else {
            res.send(err)
        }
    })
})

app.listen(3000, ()=>{
    console.log('strarted on port 3000');
});
