const registrationUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const data = {
            name,
            email,
            password
        }

        return res.status(201).json(data)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { registrationUser }