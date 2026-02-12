import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API with Authentication',
            version: '1.0.0',
            description: 'A scalable REST API with JWT authentication and role-based access control',
            contact: {
                name: 'API Support'
            }
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for development
    crossOriginEmbedderPolicy: false
}));

// CORS configuration
if(process.env.NODE_ENV !== 'production'){
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true
        })
    );
}
app.use(express.json());
//middleware to parse JSON bodies

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rate limiting - TEMPORARILY DISABLED due to Upstash Redis connection issue
// app.use(rateLimiter);

// API v1 routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", notesRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist'))); 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});
}
//app.use("/api/products",productRoutes);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log('Server is running on port: ', PORT);
    });
});
