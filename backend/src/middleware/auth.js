import jwt from 'jsonwebtoken';

// Verify JWT token
export const verifyToken = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        console.error("Error in verifyToken middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Check if user is admin
export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ 
            message: "Access denied. Admin privileges required." 
        });
    }
    next();
};

// Optional: Check if user is owner or admin
export const isOwnerOrAdmin = (model) => {
    return async (req, res, next) => {
        try {
            const resource = await model.findById(req.params.id);
            
            if (!resource) {
                return res.status(404).json({ message: "Resource not found" });
            }

            // Check if user is admin or owner
            const isOwner = resource.userId && resource.userId.toString() === req.user.id;
            const isAdmin = req.user.role === 'admin';

            if (!isOwner && !isAdmin) {
                return res.status(403).json({ 
                    message: "Access denied. You don't have permission to perform this action." 
                });
            }

            next();
        } catch (error) {
            console.error("Error in isOwnerOrAdmin middleware:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};
