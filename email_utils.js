(function () {
    const DEFAULT_RECIPIENT = {
        email: 'luisjacques98@gmail.com',
        name: 'Álvaro Jacques'
    };

    function getAccessKey() {
        return window.WEB3FORMS_ACCESS_KEY || '';
    }

    async function sendEmail(payload) {
        const accessKey = getAccessKey();

        if (!accessKey) {
            throw new Error('A chave do Web3Forms não está configurada. Crie o ficheiro web3forms.config.js a partir do exemplo.');
        }

        const body = {
            access_key: accessKey,
            from_name: payload.fromName,
            subject: payload.subject,
            email: payload.fromEmail,
            message: payload.message,
            replyto: payload.fromEmail,
            to_name: payload.toName || DEFAULT_RECIPIENT.name,
            ccemail: payload.ccEmail || '',
            botcheck: ''
        };

        if (payload.toEmail) {
            body.to_email = payload.toEmail;
        }

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || 'Não foi possível enviar o email.');
        }

        return result;
    }

    window.EmailUtils = {
        DEFAULT_RECIPIENT,
        sendEmail
    };
})();
