const Chart = require('../models/Chart');
const createLedger = require('../models/Ledger');
const path = require('path');
const spawn = require("child_process").spawn;

const getTrialBalance = async (req, res)=>{
    const result = await getAccounts();
    const pythonProcess = spawn('python',[path.join(__dirname , "../python/create-excel.py"), JSON.stringify(result)]);
    res.status(200).json(result);
}

const getAccounts = async ()=>{
    const accounts = await Chart.distinct('name');
    let trialBalance = [];
    for(i=0; i<accounts.length; i++){
        const Ledger = createLedger(accounts[i]);
        const result = await Ledger.aggregate([
        { '$match':{}},
        {
        '$group':{ _id:"_id","debitScore":{$sum:"$debitValue"}, "creditScore":{$sum:"$creditValue"}}
        }
        ])
        if(result.length > 0){
            trialBalance.push({name: accounts[i], debitValue: result[0].debitScore,
            creditValue: result[0].creditScore})
        }
    }

    // trial balance sum
    // const trialBalanceTotal = trialBalance.reduce((total, account)=>{
    //     total.debitTotal += account.debitValue;
    //     total.creditTotal += account.creditValue;
    //     return total;
    // }, {debitTotal: 0, creditTotal: 0});

    

    return trialBalance;
}

module.exports = getTrialBalance;
