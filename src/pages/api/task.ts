import axios from 'axios';
import { NextApiHandler } from 'next';

console.log('>>>>>>>>>>>>> ENV', process.env);

const targetApiUrl = `${process.env.API_ENDPOINT}/task`;

const taskHandler: NextApiHandler = async (req, res) => {
    const { method, body, query: { id } } = req;
    const apiUrl = id ? `${targetApiUrl}/${id}` : targetApiUrl;

    try {
        const axiosConfig = {
            method,
            url: apiUrl,
            data: body,
            // Add any additional headers or configuration needed
        };

        const response = await axios(axiosConfig);
        const responseData = response.data;

        // Forward the response from the target API to the client
        res.status(response.status || 200).json(responseData);
    } catch (error) {
        // Handle errors from the target API or Axios itself
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        const statusCode = error.response?.status || 500;
        res.status(statusCode).json({ error: errorMessage });
    }
};

export default taskHandler;
