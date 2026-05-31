import { ApiError } from "../utils/ApiError.js";

/**
 * Middleware for role-based authorization
 * @param {...string} roles - Allowed roles
 */
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError(401, "Unauthorized - User not found"));
        }

        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(403, `Role '${req.user.role}' is not allowed to access this resource`)
            );
        }

        next();
    };
};
