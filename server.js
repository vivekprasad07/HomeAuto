const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

let relayStatus = [false, false, false, false];

app.post('/set_relay', (req, res) => {
    const { relay_id, status } = req.body;
    if (relay_id !== undefined && status !== undefined && relay_id >= 0 && relay_id < 4) {
        relayStatus[relay_id] = status;
        return res.json({ status: 'success', relayStatus });
    }
    res.json({ status: 'failure', message: 'Invalid parameters' });
});

app.get('/get_relay_status', (req, res) => {
    res.json({ relayStatus });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
