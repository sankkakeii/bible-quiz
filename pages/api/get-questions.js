export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { question_type, category, token } = req.body;

            // Construct the data object to send to the external endpoint
            const dataToSend = {
                question_type,
                category
            };

            // Make a POST request to the external endpoint
            const externalResponse = await fetch('https://sub-engine.fintecgrate.com/api/jgc/questions/retrieve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });

            // Check if the external request was successful
            if (!externalResponse.ok) {
                throw new Error('External request failed');
            }

            // Parse the response from the external endpoint
            const responseData = await externalResponse.json();

            // Send the response back to the client
            res.status(200).json({ message: 'Questions retrieved successfully', data: responseData });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message, message: 'Failed to retrieve questions' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
