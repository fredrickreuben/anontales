import { CollectionReference, Timestamp } from "firebase/firestore"

export type UserState = {
	users: User[]
	user?: User
	loading: boolean
}

export type SearchQuery = {
	limit: number
	query?: string
	last?: any
}

export type NavItem = {
	title: string
	href: string
	disabled?: boolean
}

export type NavConfig = {
	mainNav: MainNavItem[]
}

export type MainNavItem = NavItem

export type SiteConfig = {
	name: string
	description: string
	url: string
	ogImage: string
	links: {
		twitter: string
		github: string
		linkedin: string
	}
}

export type Tale = {
	id: string
	content: string
	published: boolean
	createdAt?: String
	updatedAt?: String
	userId: string
}

export type Comment = {
	id: string
	taleId: string
	message: string
	createdAt?: String
	updatedAt?: String
	userId: string
}

export type IFirebaseConfig = {
    apiKey: string;
    authDomain: string;
	projectId: string;
	databaseURL?: string,
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
}