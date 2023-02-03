function getHome(req, res) {
    res.status(200).send({
        "msg": "Home de la API"
    })
}

module.exports = {
    getHome
};