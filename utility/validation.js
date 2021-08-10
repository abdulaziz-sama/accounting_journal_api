const Chart = require('../models/Chart');

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
        if(debit_accounts[i].value <= 0){
            return false            
        } else {
            debitValues += debit_accounts[i].value;
        }
    }
    for(i=0; i < credit_accounts.length; i++){
        if(credit_accounts[i].value <= 0){
            return false;
        } else {
            creditValues += credit_accounts[i].value;
        }
    }
    return ((debitValues === creditValues) || correction_entry);
}

module.exports = {entryValidator}