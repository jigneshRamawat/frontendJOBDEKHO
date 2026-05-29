import { rateLimit } from 'express-rate-limit';

const limit = rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 3,
    statusCode: 429,
    message: "you login after 2min ip block"
});

export { limit };