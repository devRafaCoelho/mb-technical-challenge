const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{2,3}\)?[- ]?\d{4,5}[- ]?\d{4}$/;

const validateRegistration = (req, res, next) => {
    const {
        email,
        type,
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
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!type) {
            return res.status(400).json({ error: 'Type is required' });
        }

        if (type !== 'PF' && type !== 'PJ') {
            return res.status(400).json({ error: 'Invalid type of registration' });
        }

        if (type === 'PF') {
            if (!name || !cpf || !birthDate || !phone) {
                return res.status(400).json({ error: 'All fields are required for PF' });
            }

            if (!/^\d{11}$/.test(cpf)) {
                return res.status(400).json({ error: 'Invalid CPF format' });
            }

            if (isNaN(new Date(birthDate).getTime())) {
                return res.status(400).json({ error: 'Invalid date of birth format' });
            }

            if (!phone || !phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Invalid phone number format' });
            }
        } else if (type === 'PJ') {
            if (!companyName || !cnpj || !openingDate || !phone) {
                return res.status(400).json({ error: 'All fields are required for PJ' });
            }

            if (!/^\d{14}$/.test(cnpj)) {
                return res.status(400).json({ error: 'Invalid CNPJ format' });
            }

            if (isNaN(new Date(openingDate).getTime())) {
                return res.status(400).json({ error: 'Invalid opening date format' });
            }

            if (!phone || !phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Invalid phone number format' });
            }
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { validateRegistration };

