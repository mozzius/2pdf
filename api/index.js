const { parse } = require('url');
const getPDF = require('../pdf');

module.exports = async (req, res) => {
    try {
        const { pathname = '/' } = parse(req.url, true);
        if (pathname === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.status(500).end(`<h1>2pdf</h1><p>Go to https://2pdf.now.sh/example.com to render it as a PDF</p>`);
        } else {
            let url = pathname.slice(1);
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            const pdf = await getPDF(url);
            res.setHeader('Content-Type', 'application/pdf');
            res.status(200).send(pdf);
        }
    } catch (e) {
        res.setHeader('Content-Type', 'text/html');
        res.status(500).end(`<h1>Server Error</h1><p>Sorry, there was a problem</p><pre>${e.message}</pre>`);
        console.error(e.message);
    }
};