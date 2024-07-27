const API_URL = 'http://localhost:8000';

export const registrationUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
};
