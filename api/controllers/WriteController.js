module.exports = {
	GetDataWrite: function(req, res) {
		res.view('write/write', {url: req.url})
	}
}