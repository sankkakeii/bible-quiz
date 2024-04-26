export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            // Construct the data object to send to the external login endpoint
            const dataToSend = {
                email,
                password
            };

            // Make a POST request to the external login endpoint
            const externalResponse = await fetch('https://sub-engine.fintecgrate.com/api/jgc/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            // Check if the external request was successful
            if (!externalResponse.ok) {
                throw new Error('External request failed');
            }

            // Parse the response from the external login endpoint
            const responseData = await externalResponse.json();

            // Send the response back to the client
            res.status(200).json({ message: 'Login successful', data: responseData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error, message: 'Failed to login' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
