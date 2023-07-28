import { Timestamp, deleteDoc, query, orderBy, doc, getDoc, getDocs, setDoc, updateDoc, limit, startAfter, where } from "firebase/firestore";
import api from "."
import { Comment, SearchQuery } from "../../../types"
import { FirebaseError } from "firebase/app";
import FirebaseInstance from "@anontales/lib/firebase";

const firebaseIstance = FirebaseInstance.getInstance()
const ref = firebaseIstance.getRefrence('comments')

const commentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchComments: builder.query<Comment[], SearchQuery>({
            queryFn: async (search: SearchQuery) => {

                const qry = search.last ? query(ref, where('taleId', '==', search.query), limit(search.limit), startAfter(search.last ?? null)) : query(ref, where('taleId', '==', search.query), limit(search.limit))

                return getDocs(qry)
                    .then((res) => {
                        let comments: Comment[] = [];
                        res?.forEach((doc) => {
                            const v = doc.data() as any
                            comments.push({ id: doc.id, ...v, createdAt: JSON.stringify(v.createdAt), updatedAt: v.updatedAt ? JSON.stringify(v.updatedAt) : null } as Comment)
                        });
                        return { data: comments };
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message };
                    })
            },
            providesTags: ['COMMENTS'],
        }),

        fetchComment: builder.query({
            queryFn: async (params: any) => {
                return await getDoc(doc(ref, params.id))
                    .then(async (res) => {
                        return { data: { id: res.id, ...res.data } }
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message };
                    })
            },
        }),

        createComment: builder.mutation({
            queryFn: async (tale: Comment) => {
                const createdAt = Timestamp.now()
                return await setDoc(doc(ref, tale.id), { ...tale, createdAt })
                    .then(async (r) => {
                        const res = await getDoc(doc(ref, tale.id))
                        return { data: { id: res.id, ...res.data } as Comment }
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message }
                    })
            },
            invalidatesTags: ['COMMENTS']
        }),

        updateComment: builder.mutation({
            queryFn: async (tale) => {
                const updatedAt = Timestamp.now()
                const createdAt = JSON.parse(tale.createdAt)
                return await updateDoc(doc(ref, tale.id), { ...tale, createdAt, updatedAt })
                    .then(async (r) => {
                        const res = await getDoc(doc(ref, tale.id))
                        return { data: { id: res.id, ...res.data } as Comment }
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message }
                    })
            },
            invalidatesTags: ['COMMENTS']
        }),

        deleteComment: builder.mutation({
            queryFn: async (params: any) => {
                return await deleteDoc(doc(ref, params.tale.id))
                    .then((r) => {
                        return { data: true }
                    })
                    .catch(e => {
                        return { error: e.message }
                    })
            },
            invalidatesTags: ['COMMENTS']
        })
    }),
    overrideExisting: true,
})

export const {
    useFetchCommentsQuery,
    useFetchCommentQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation
} = commentsApi