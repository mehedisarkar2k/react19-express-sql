import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserApi } from '../api'

export const useRegisterUserMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: UserApi.registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })
}
