import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { env } from "../../env.mjs"

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs))
}

export const formatDate = (input: string | number): string => {
	const date = new Date(input)
	return date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	})
}

export const absoluteUrl = (path: string) => {
	return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export const username = (): string => {

	const characters = 'abcdefghijklmnopqrstuvwxyz';
	const usernameLength = 8;
	let randomUsername = '';

	for (let i = 0; i < usernameLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomUsername += characters[randomIndex];
	}

	for (let i = 0; i < 3; i++) {
		const randomNumber = Math.floor(Math.random() * 10);
		randomUsername += randomNumber;
	}

	return randomUsername;
}
