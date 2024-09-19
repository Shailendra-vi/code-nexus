const { dockerExecuter } = require('../services/dockerService');

const codeExecuter = async (req, res) => {
    const { code, lang, input } = req.body;
    if (!code || !lang) {
        return res.status(400).json({ error: 'Code and language are required.' });
    }
    try {
        const result = await dockerExecuter(code, lang, input);
        res.json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = { codeExecuter }