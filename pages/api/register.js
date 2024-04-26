export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { name, dob, zone, category } = req.body;
            let to_take = 'multichoice';

            // Construct the data object to send to the external endpoint
            const dataToSend = {
                name,
                dob,
                zone,
                category,
                to_take
            };

            // Make a POST request to the external endpoint
            const externalResponse = await fetch('https://sub-engine.fintecgrate.com/api/jgc/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            // Check if the external request was successful
            if (!externalResponse.ok) {
                throw new Error('external request failed');
            }

            // Parse the response from the external endpoint
            const responseData = await externalResponse.json();

            // Send the response back to the client
            res.status(200).json({ message: 'User registered successfully', data: responseData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error, message: 'Failed to register user' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
