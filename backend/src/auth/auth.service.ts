import jwt, { Secret } from "jsonwebtoken";

export interface decodedToken {
	id: string;
}

function generateToken(payload: string | object) {
	const secretKey: Secret | undefined = process.env.JWT_SECRET_KEY;
	if (secretKey) {
		return jwt.sign(payload, secretKey, { expiresIn: "24h" });
	}
	throw new Error("JWT secret key is undefined");
}

function verifyToken(token: string): decodedToken {
	const secretKey: Secret | undefined = process.env.JWT_SECRET_KEY;

	try {
		if (secretKey) {
			const verifyedToken = jwt.verify(token, secretKey) as decodedToken;
			return verifyedToken;
		}
		throw new Error("JWT secret key is undefined");
	} catch (ex) {
		throw new Error("Invalid token");
	}
}

export { generateToken, verifyToken };
