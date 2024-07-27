const registrationUser = async (req, res) => {
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

    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\(?\d{2,3}\)?[- ]?\d{4,5}[- ]?\d{4}$/;

    try {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (!type || (type !== 'PF' && type !== 'PJ')) {
            return res.status(400).json({ error: 'Invalid type of registration' });
        }

        if (type === 'PF') {
            // Validação dos campos específicos para Pessoa Física (PF)
            if (!name || !cpf || !birthDate || !phone) {
                return res.status(400).json({ error: 'All fields are required for PF' });
            }

            // Validação do CPF
            if (!/^\d{11}$/.test(cpf)) {
                return res.status(400).json({ error: 'Invalid CPF format' });
            }

            // Validação da data de nascimento (DD-MM-YYYY)
            if (!dateRegex.test(birthDate)) {
                return res.status(400).json({ error: 'Invalid date of birth format' });
            }
            const [day, month, year] = birthDate.split('-').map(Number);
            const date = new Date(`${year}-${month}-${day}`);
            if (!(date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day)) {
                return res.status(400).json({ error: 'Invalid date of birth value' });
            }

            // Validação do telefone
            if (!phone || !phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Invalid phone number format' });
            }
        } else if (type === 'PJ') {
            // Validação dos campos específicos para Pessoa Jurídica (PJ)
            if (!companyName || !cnpj || !openingDate || !phone) {
                return res.status(400).json({ error: 'All fields are required for PJ' });
            }

            // Validação do CNPJ
            if (!/^\d{14}$/.test(cnpj)) {
                return res.status(400).json({ error: 'Invalid CNPJ format' });
            }

            // Validação da data de abertura (DD-MM-YYYY)
            if (!dateRegex.test(openingDate)) {
                return res.status(400).json({ error: 'Invalid opening date format' });
            }
            const [day, month, year] = openingDate.split('-').map(Number);
            const date = new Date(`${year}-${month}-${day}`);
            if (!(date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day)) {
                return res.status(400).json({ error: 'Invalid opening date value' });
            }

            // Validação do telefone
            if (!phone || !phoneRegex.test(phone)) {
                return res.status(400).json({ error: 'Invalid phone number format' });
            }
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Simulação do salvamento dos dados
        res.status(201).json({ message: 'Registration successful', data: req.body });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { registrationUser }