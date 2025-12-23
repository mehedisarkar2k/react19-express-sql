import { useQuery } from "@tanstack/react-query"
import { UserApi } from "../api"
import { queryKeys } from "../query-key"

export const useCheckUsernameAvailableQuery = (username?: string) => {
    return useQuery({
        queryKey: queryKeys.user.checkUsernameAvailable(username || ''),
        queryFn: () => UserApi.checkUsernameAvailable(username || ''),
        enabled: !!username,
    })
}