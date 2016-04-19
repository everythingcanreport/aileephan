module.exports = {
    GetDataContact: function(req, res) {
        res.view('contact/contact', { url: req.url, title: 'Ailee Phan' });
    }
};
