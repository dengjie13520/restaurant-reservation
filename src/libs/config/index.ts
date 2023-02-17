import { config } from 'dotenv'

config()

const env = loadEnv()

export default async () => {
    return env
}

export const DEFAULT_TIMEZONE = 'Asia/Shanghai'
function loadEnv() {
    return {
        timezone: process.env['TIMEZONE'] || DEFAULT_TIMEZONE,
        reservation: {
            status: process.env['RESERVATION_URL'] || "open",
        },
        jwt: {
            secret: process.env['JWT_SECRET'],
            expiresIn: process.env['JWT_EXPIRESIN'],
            algorithm: process.env['JWT_ALGORITHM'],
        },
        mongo: {
            uri: process.env['JWT_SECRET'],
            user: process.env['JWT_EXPIRESIN'],
            pass: process.env['JWT_ALGORITHM'],
            dbName: process.env['JWT_ALGORITHM'],
            socketTimeoutMS:process.env['JWT_ALGORITHM']
        },

    }
}

