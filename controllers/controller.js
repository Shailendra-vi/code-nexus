const { dockerExecuter } = require('../services/dockerService');

const codeExecuter = async (req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    
    const { code, lang, input } = req.body;
    if (!code || !lang) {
        return res.status(400).json({ error: 'Code and language are required.' });
    }
    try {
        await dockerExecuter(res, code, lang, input);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = { codeExecuter }