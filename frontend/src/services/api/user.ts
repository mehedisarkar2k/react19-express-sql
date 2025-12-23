import { apiClient } from './client'
import type { RegisterUser } from '@/types'

export const UserApi = {
    registerUser: async (data: RegisterUser) => {
        const { data: token } = await apiClient.post<string>(`/user`, data)

        return token
    },

    checkUsernameAvailable: async (username: string) => {
        const { data: available } = await apiClient.get(`/user/check-username`, { params: { username } })

        return available
    },
}
