import { Timestamp, deleteDoc, query, orderBy, doc, getDoc, getDocs, setDoc, updateDoc, limit, startAfter } from "firebase/firestore";
import api from "."
import { SearchQuery, Tale } from "../../../types"
import { FirebaseError } from "firebase/app";
import FirebaseInstance from "@anontales/lib/firebase";

const firebaseIstance = FirebaseInstance.getInstance()
const ref = firebaseIstance.getRefrence('tales')

const talesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchTales: builder.query<Tale[], SearchQuery>({
            queryFn: async (search: SearchQuery) => {

                const qry = search.last ? query(ref, orderBy("createdAt", 'desc'), limit(search.limit), startAfter(search.last ?? null)) : query(ref, orderBy("createdAt", 'desc'), limit(search.limit))

                return getDocs(qry)
                    .then((res) => {
                        let tales: Tale[] = [];
                        res?.forEach((doc) => {
                            const v = doc.data() as any
                            tales.push({ id: doc.id, ...v, createdAt: JSON.stringify(v.createdAt), updatedAt: v.updatedAt ? JSON.stringify(v.updatedAt) : null } as Tale)
                        });
                        return { data: tales };
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message };
                    })
            },
            providesTags: ['TALES'],
        }),

        fetchTale: builder.query({
            queryFn: async (params: any) => {
                return await getDoc(doc(ref, params.id))
                    .then(async (res) => {
                        return { data: { id: res.id, ...res.data } }
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message };
                    })
            },
        }),

        createTale: builder.mutation({
            queryFn: async (tale: Tale) => {
                const createdAt = Timestamp.now()
                return await setDoc(doc(ref, tale.id), { ...tale, createdAt })
                    .then(async (r) => {
                        const res = await getDoc(doc(ref, tale.id))
                        return { data: { id: res.id, ...res.data } as Tale }
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message }
                    })
            },
            invalidatesTags: ['TALES']
        }),

        updateTale: builder.mutation({
            queryFn: async (tale) => {
                const updatedAt = Timestamp.now()
                const createdAt = JSON.parse(tale.createdAt)
                return await updateDoc(doc(ref, tale.id), { ...tale, createdAt, updatedAt })
                    .then(async (r) => {
                        const res = await getDoc(doc(ref, tale.id))
                        return { data: { id: res.id, ...res.data } as Tale }
                    }).catch((error: FirebaseError | any) => {
                        return { error: error.message }
                    })
            },
            invalidatesTags: ['TALES']
        }),

        deleteTale: builder.mutation({
            queryFn: async (params: any) => {
                return await deleteDoc(doc(ref, params.tale.id))
                    .then((r) => {
                        return { data: true }
                    })
                    .catch(e => {
                        return { error: e.message }
                    })
            },
            invalidatesTags: ['TALES']
        })
    }),
    overrideExisting: true,
})

export const {
    useFetchTalesQuery,
    useFetchTaleQuery,
    useCreateTaleMutation,
    useUpdateTaleMutation,
    useDeleteTaleMutation
} = talesApi