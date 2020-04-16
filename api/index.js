const getPDF = require("./pdf");

module.exports = async (req, res) => {
    const { pathname = '/' } = parse(req.url, true);
    let url = pathname.slice(1);
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    try {
        const pdf = await getPDF(url);
        res.statusCode = 200;
        res.set('Content-type', 'application/pdf');
        res.end(pdf);
    } catch {
        res.sendStatus(500);
    }
};