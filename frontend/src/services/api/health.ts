import { apiClient, API_BASE_URL } from './client'

export const healthApi = {
    getHealth: async () => {
        const { data } = await apiClient.get<string>(`${API_BASE_URL}/health`)

        return data
    },
}
