import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
    tagTypes: ['TALES', 'COMMENTS', 'USERS'],
    reducerPath: 'talesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: () => ({})
})

export default api