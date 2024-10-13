import { IUser } from "./users.interface";
import UserModel from "./users.model";
import bcrypt from "bcrypt";

export async function RegisterNewUser(username: string, password: string) {
	// create hash and salt from from pass word and save in user
	const saltRounds = 10;

	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await UserModel.create({
		username: username,
		hash: hashedPassword,
		salt: salt,
	});

	console.log("New user created: ", username);

	return user as IUser;
}

export async function LoginAUser(username: string, password: string) {
	const user = await UserModel.findOne({ where: { username } });

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isPasswordValid = await bcrypt.compare(password, user.hash);

	if (!isPasswordValid) {
		throw new Error("Invalid credentials");
	}

	return user as IUser;
}
