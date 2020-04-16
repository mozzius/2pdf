const getPDF = require("../pdf");

module.exports = async (req, res) => {
    const { pathname = '/' } = parse(req.url, true);
    let url = pathname.slice(1);
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    console.log(url);
    try {
        const pdf = await getPDF(url);
        res.set('Content-type', 'application/pdf');
        res.status(200).send(pdf);
    } catch {
        res.sendStatus(500);
    }
};