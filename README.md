# msr-giftcard-rpc

Ever wanted to print out a gift card for a friend containing actual digital internet money, specifically Masari?

Now you can!

# Requirements

- Masari wallet RPC instance
- NodeJS
- Webserver
- Elite skills.

A Masari daemon is NOT required with this. There is no reason to launch the wallet-rpc instance with the daemon as we are not synchronizing wallets. However, if you do this, the wallets may not close until they are finished synchronizing causing a load of other issues for you that I will not help you with.

# Running

Start up your wallet RPC Instance with flags: `--wallet-dir ./wallets --rpc-bind-port <port> --disable-rpc-login`

What it does: starts a RPC instance for Masari wallet, looks in ./wallets directory to open/create/save wallets to. Sits idle on port <port> until called upon.

Launch your wallet proxy API. `node api.js`
API.JS exists solely to create NEW random named wallets. You may expose your API to public, which is safer than exposing the wallet-rpc instance. This can be done to allow you to generate wallets from other applications.

Run the web piece however you like.
npm run start will run it on port 3004. Use nginx to proxy it.
npm run build will build the files out and allow you to place in your favorite web directory.

# Support
Open an issue.

# Problems
Likely forgot to add a package or two in package.json.
