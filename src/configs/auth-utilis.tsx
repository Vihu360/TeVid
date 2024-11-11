import jwt from 'jsonwebtoken';
import { User } from './types';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'your_access_token_secret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

const accessTokenExpiry = '15m';
const refreshTokenExpiry = '20d';

// Function to generate Access Token
export const generateAccessToken = (user: User): string => {
	return jwt.sign(
		{ id: user.id, email: user.email },
		accessTokenSecret,
		{ expiresIn: accessTokenExpiry }
	);
};

// Function to generate Refresh Token
export const generateRefreshToken = (user: User): string => {
	return jwt.sign(
		{ id: user.id, email: user.email },
		refreshTokenSecret,
		{ expiresIn: refreshTokenExpiry }
	);
};

// Function to verify Access Token
export const verifyAccessToken = (token: string): User | null => {
	try {
		return jwt.verify(token, accessTokenSecret) as User;
	} catch (error) {
		console.log("verification access token err :", error)
		return null;
	}
};

// Function to verify Refresh Token
export const verifyRefreshToken = (token: string): User | null => {
	try {
		return jwt.verify(token, refreshTokenSecret) as User;
	} catch (error) {
		console.log("verification refresh token err :", error)
		return null;
	}
};
