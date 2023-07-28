import { getInstance } from "@anontales/lib/axios"
import api from "."
import { User } from "@clerk/nextjs/server"
import { AxiosError } from "axios"

const apiKey = process.env.NEXT_PUBLIC_CLERK_SECRET_KEY

const axios = getInstance('https://api.clerk.com/v1/users', String(apiKey))

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query<User | any, string>({
            queryFn: async () => {
                return await axios.get<User[]>('').then((res) => {
                    return { data: res.data };
                }).catch((error: AxiosError | any) => {
                    return { error: error.message };
                })
            },
            providesTags: ['USERS'],
        }),

        fetchUser: builder.query<User, string>({
            queryFn: async (id: string) => {
                return await axios.get<User>(id).then((res) => {
                    return { data: res.data };
                }).catch((error: AxiosError | any) => {
                    return { error: error.message };
                })
            },
        }),
    }),
    overrideExisting: true,
})

export const {
    useFetchUsersQuery,
    useFetchUserQuery
} = usersApi