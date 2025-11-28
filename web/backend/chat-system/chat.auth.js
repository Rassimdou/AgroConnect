import jwt from 'jsonwebtoken';
import prisma from '../prisma/prisma.client.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';


export const decodeChatToken = async (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
}