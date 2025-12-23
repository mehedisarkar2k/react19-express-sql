export const queryKeys = {
    health: {
        all: () => ['health'],
    },
    user: {
        checkUsernameAvailable: (username: string) => ['user', 'check-username', username],
    }
}
