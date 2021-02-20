const config = require('./config.json'); // config variables
const express = require('express'); // express for api
const app = express(); // initiate express
const M = require('monerojs2'); // monerojs package by sneurlax works decently
const cors = require('cors'); // easiest way to deal with CORS
const fs = require('fs'); // file read/open/write package

app.use(cors()); 

app.listen(config.api.port, () => {
    console.log('# # # # # # # # # # # # # # # # # # # # # #');
    console.log('# - - - - Masari Gift Cards - - - - #');
    console.log('# - - I S - B O O T I N G - U P - O N - - #');
    console.log('# - - - - - - P O R T - ' + config.api.port + ' - - - - - - #');
    console.log('# - - - Process ID: ' + process.pid + ' - - - #')
    console.log('# # # # # # # # # # # # # # # # # # # # # #');
});

app.get('/api/new', (req, res) => { // when a user hits this api end point
    let l = Math.floor(Math.random() * 16) + 4; // we'll first randomly pick a length of the wallet file name
    createWallet(l) // proceed to creating the wallet
        .then((results) => {
            res.send(results); // when it's all said and done, send us back the results.
        })
});

async function createWallet(length) {
    let hashed = await hashName(length); // the wallet name is being randomly generated based on the randomly chosen wallet name length
    let walletData = []; // we'll store some data here in a few secs
    return new Promise((resolve) => {
        var walletRPC = new M.walletRPC(config.wallet.ip, config.wallet.port, config.wallet.user, config.wallet.password) // connect to the wallet RPC Instance
            .then((wallet) => {
                walletRPC = wallet;
                walletRPC.create_wallet(hashed, '') // create a new wallet with file name as hashed variable and no password.
                    .then((newWallet) => {
                        walletRPC.open_wallet(hashed, '') // open the newly created wallet
                            .then((newly) => {
                                walletRPC.getaddress() // get the public address of it
                                    .then((addr) => {
                                        walletRPC.mnemonic() // get the seed of it
                                            .then((seed) => {
                                                walletRPC.close_wallet(hashed) // close it
                                                    .then((closed) => { 
                                                        walletData.push({   // tell us what the address and seed are
                                                            "seed": seed.key,
                                                            "addr": addr.address
                                                        });
                                                        resolve(walletData) // send it to us
                                                        fs.unlinkSync('./wallets/' + hashed + '.keys', (res, err) => {  // then delete the .keys file

                                                        })
                                                        fs.unlinkSync('./wallets/' + hashed + '.cache', (res, err) => { // then delete the .cache file

                                                        })
                                                    })
                                            })
                                    })
                            })
                    })

            })
    })
}

async function hashName(length) { // credits to a stackoverflow post for this
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}