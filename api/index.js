const getPDF = require("./pdf");

module.exports = async (req, res) => {
    const { pathname = '/' } = parse(req.url, true);
    let url = pathname.slice(1);
    if (!url.startsWith('http')) {
        url = 'https://' + url;
    }
    const pdf = await getPDF(url);
    const stream = await pdf.toStream();
    res.statusCode = 200;
    res.set('Content-type', 'application/pdf');
    stream.pipe(res)
};