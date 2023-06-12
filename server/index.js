const secp = require('ethereum-cryptography/secp256k1')
const keccek = require('ethereum-cryptography/keccak')
const utils = require('ethereum-cryptography/utils')

const express = require('express')
const logger = require('morgan')
const app = express()
const cors = require('cors')
const port = 3042

app.use(cors())
app.use(logger('common'))
app.use(express.json())

const balances = {}

app.get('/balance/:address', (req, res) => {
    const { address } = req.params
    const balance = balances[address] || 0
    res.send({ balance })
})

app.post('/send', (req, res) => {
    const { signature, message } = req.body
    const { sender, recipient, amount } = message

    const sender_wallet_address = getWalletAddress(sender);
    setInitialBalance(sender_wallet_address);
    setInitialBalance(recipient)

    if (balances[sender_wallet_address] < amount) {
        res.status(400).send({ message: 'Not enough funds!' })
    } else {
        balances[sender_wallet_address] -= amount;
        balances[recipient] += amount;
        res.json({ balance: balances[sender] })
    }
})

app.post('/minted', (req, res) => {
    const { sender, coins } = req.body

    setInitialBalance(sender)
    balances[sender] += coins

    res.json({
        balance: balances[sender],
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
    if (!balances[address]) {
        balances[address] = 0
    }
}

function getPublicKey(signature, message, sender) {
    const msgHsh = keccek.keccak256(
        utils.utf8ToBytes(JSON.stringify(message))
    );
    const sign = secp.secp256k1.Signature.fromCompact(signature);
    sign.recovery = 0

    const isVerified = secp.secp256k1.verify(sign, msgHsh, sender);

    return isVerified
}

function getWalletAddress(publicKey) {
    const public_key_array = Uint8Array.from(Buffer.from(publicKey, 'hex'));
    const walletAddress = keccek.keccak256(public_key_array.slice(1)).slice(-20)
    return utils.toHex(walletAddress)
}
