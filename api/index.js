const getPDF = require('../pdf');

module.exports = async (req, res) => {
    try {
        const { pathname = '/' } = parse(req.url, true);
        let url = pathname.slice(1);
        if (!url.startsWith('http')) {
            url = 'https://' + url;
        }
        const pdf = await getPDF(url);
        res.status(200).send(pdf);
    } catch {
        res.sendStatus(500);
    }
};