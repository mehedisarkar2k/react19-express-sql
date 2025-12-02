import { SendResponse } from './send-response';

export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(
    fn: T
): T => {
    return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            return await fn(...args);
        } catch (error) {
            SendResponse.internalServerError({
                res: args[1],
                message: 'Internal Server Error',
            });

            return Promise.reject(error);
        }
    }) as T;
};
