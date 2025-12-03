import { sign as JWTSign, verify as JWTVerify } from 'jsonwebtoken';
import { ENV } from '../config';

const sign = async (payload: Record<string, unknown>) => {
    const token = JWTSign(payload, ENV.JWT_SECRET_KEY, {
        expiresIn: '1h',
    });

    return token;
};

const singRefreshToken = <T>(payload: T) => {
    const token = JWTSign({ payload }, ENV.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: '30d',
    });

    // TODO: store refresh token in DB (for rotation, logout, revocation)
    return token;
};

const verify = <T>(token: string): T => {
    try {
        const decoded = JWTVerify(token, ENV.JWT_SECRET_KEY);

        return decoded as T;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const refreshToken = (refreshToken: string) => {
    try {
        const decoded = JWTVerify(refreshToken, ENV.REFRESH_TOKEN_SECRET_KEY) as {
            payload: Record<string, unknown>;
        };

        // TODO: verify refresh token exists in DB and is still valid

        const newAccessToken = JWTSign(decoded.payload, ENV.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });

        const newRefreshToken = JWTSign(
            { payload: decoded.payload },
            ENV.REFRESH_TOKEN_SECRET_KEY,
            {
                expiresIn: '30d',
            }
        );

        // TODO: rotate refresh token in DB (remove old, save new)

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
};

export const JWTToken = {
    sign,
    verify,
    singRefreshToken,
    refreshToken,
};
