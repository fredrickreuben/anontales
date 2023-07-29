import { useEffect, useState } from "react";
import { SearchQuery } from "../../types";

const useSearch = (query: SearchQuery, refetch: () => void) => {

    const [search, setSearch] = useState<SearchQuery>(query)

    useEffect(() => {
        refetch()
    }, [search, refetch])

    return { search, setSearch }
}

export default useSearch