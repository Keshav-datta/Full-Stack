// App.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    balance: { type: Number, required: true, default: 0 }
});

const Account = mongoose.model('Account', accountSchema);

app.post('/transfer', async (req, res) => {
    const { from, to, amount } = req.body;

    if (!from || !to || !amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid transfer data' });
    }

    try {
        const sender = await Account.findOne({ username: from });
        const receiver = await Account.findOne({ username: to });

        if (!sender) return res.status(404).json({ error: 'Sender account not found' });
        if (!receiver) return res.status(404).json({ error: 'Receiver account not found' });
        if (sender.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        res.json({
            message: Transferred ${amount} from ${from} to ${to},
            senderBalance: sender.balance,
            receiverBalance: receiver.balance
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});

// seed.js

const mongoose = require('mongoose');
const Account = require('./app').Account;

mongoose.connect('mongodb://127.0.0.1:27017/bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const accounts = [
    { username: 'alice', balance: 1000 },
    { username: 'bob', balance: 500 },
    { username: 'charlie', balance: 200 }
];

Account.insertMany(accounts)
    .then(() => {
        console.log('Accounts created');
        mongoose.disconnect();
    })
    .catch(err => console.log(err));
