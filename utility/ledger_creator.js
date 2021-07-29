const createLedger = require('../models/Ledger');

const postToLedger = (debit_accounts, credit_accounts, date, journal_id)=>{
    //post to debited accounts ledgers
    for(i=0; i < debit_accounts.length; i++){
        const accountName = debit_accounts[i].account;
        const Ledger = createLedger(accountName);
        const newDoc = new Ledger({
            date,
            journal_id,
            debitValue: debit_accounts[i].value
        });
        newDoc.save();
    }

    //post to debited accounts ledgers
    // for(i=0; i<credit_accounts; i++){

    // }
}

module.exports = postToLedger