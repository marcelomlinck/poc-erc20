import { errorHandler, jwtMiddleware } from 'helpers/api';
const jwt = require('jsonwebtoken');

export { apiHandler };

function apiHandler(handler) {
    return async (req, res) => {
        const method = req.method.toLowerCase();

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // global middleware
            await jwtMiddleware(req, res);

            //limit some routes only to
            if(req.headers.authorization) {
                const authHeader = req.headers.authorization;
                const token = authHeader.split(' ')[1];
                const decodedToken = jwt.decode(token)
                if (req.url === '/api/users' || req.url.startsWith('/api/users/mint') || req.url.startsWith('/api/users/deduct')) {
                    console.log(process.env.BLOCKCHAIN_OWNER_ADDRESS)
                    if (decodedToken?.key !== process.env.BLOCKCHAIN_OWNER_ADDRESS) {
                        return res.status(403).end();
                    }
                }
            }
            
            // route handler
            await handler[method](req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}