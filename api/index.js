const getPDF = require("./pdf");

module.exports = async (req, res) => {
    const { pathname = '/', query = {} } = parse(req.url, true);
    const { type = 'png' } = query; // png or jpeg
    let url = pathname.slice(1);
    if (!url.startsWith('http')) {
        url = 'https://' + url; // add protocol if missing
    }
    const file = await getScreenshot(url, type);
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${type}`);
    res.end(file);
};