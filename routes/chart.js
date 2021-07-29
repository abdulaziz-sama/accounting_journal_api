const express = require('express');
const router = express.Router();
const {getAllAccounts, postAccount, deleteAllAccounts, getSingleAccount,
patchSingleAccount, deleteSingleAccount
} = require('../controllers/chart')


// handling requests to query all accounts, post account or delete all accounts
router.route('/').get(getAllAccounts).post(postAccount).delete(deleteAllAccounts);

// requests targeting a single account
router.route('/:account').get(getSingleAccount)
.patch(patchSingleAccount).delete(deleteSingleAccount);

module.exports = router;