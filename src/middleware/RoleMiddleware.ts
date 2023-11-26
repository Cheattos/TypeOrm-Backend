// role.middleware.ts
import { Request, Response, NextFunction } from 'express';

function RoleMiddleware(user_role : string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.body.user_role;

        if (userRole === user_role) {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied' });
        }
    };
}

export default RoleMiddleware;