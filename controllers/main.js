const jwt = require('jsonwebtoken')

const CustomAPIError = require("../errors/custom-error")

const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    
    if (!username || !password) {
        throw CustomAPIError('Please provide your login details',400)
    }
    const id = new Date().getTime()
    const token = jwt.sign({ id, username }, process.env.jwtSecret, { expiresIn:'30d'})
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req, res) => {
    const luckyNumbers = Math.floor(Math.random()* 100)
    return res.status(200).json({msg:`hello wllcome to the dashboard john doe here is your secret key ${luckyNumbers}`})
}
module.exports = {
    login,
    dashboard
}