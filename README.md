# Project Details

we use Unlock protocol to allow members to purchase keys and use them for accessing the DAO webapp. A custom token (named MRS token) based on the ERC-20 standard is used to reward contributors of the DAO. Users initially receive a few tokens which will enable them to start contributing to the community by adding story suggestion posts. The token contract is currently on the Rinkeby chain.
We use ReactJS with TailwindCSS for the front end application. A NodeJS Express server runs on the backend and some user level information is stored in MongoDB. The posts that users add for story suggestions are stored on MongoDB and a copy of that is stored on IPFS over web3.storage. We use pinata to store the json of each new post to IPFS.

## Server Code Repository

The Express server code is hosted on this repository - https://github.com/suhasBR/minerpetsDAO-server


## Server Code Repository

Rinkeby Explorer page for MRS token (custom ERC-20 token implementation- https://rinkeby.etherscan.io/token/0x2f8b8b239c89588d46b83ad2faa7ca7b3ab476f0?a=0xf142e483194328b5538c437f033a6bfa256b97a5 
