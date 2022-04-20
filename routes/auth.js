const controller = require('../controllers/auth');
const { validateRole } = require('../middleware')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers", "x-access-token , Origin , Content-Type, Accept"
        )
        next()
    })

    app.post('/ecomm/api/v1/auth/signup',[validateRole.verifyRole], controller.signUp)
    app.post('/ecomm/api/v1/auth/signin', controller.signIn)
}
