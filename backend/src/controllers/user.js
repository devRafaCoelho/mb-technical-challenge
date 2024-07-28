const registrationUser = async (req, res) => {
    const {
        email,
        registrationType,
        name,
        cpf,
        birthDate,
        phone,
        companyName,
        cnpj,
        openingDate,
        password
    } = req.body;

    try {
        res.status(201).json({ message: 'Registration successful', data: req.body });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { registrationUser };
