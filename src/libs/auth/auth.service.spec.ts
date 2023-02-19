import { AuthService } from './auth.service'

describe('auth.service', () => {

    const sut = new AuthService()
    it('verifies a token', async () => {
        const res = await sut.validUserToken(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiNzg5IiwiZ3Vlc3RJZCI6Ii0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NzY3OTE1NjEsImV4cCI6MTY3Njc5NTE2MX0.1r2L80jekOkfZcllEey936k_NdXAYLn8DVYH4V6IeKw'
        )
        expect(res).toStrictEqual({
               "account": "789",
               "exp": 1676795161,
               "guestId": "-",
               "iat": 1676791561,
               "role": "admin",
        })
    })

    it('signs a token with 1 hour expiration', async () => {
        const jwt = await sut.getUserToken({
            account: 'fake',
            guestId: 'fakeSession',
            role: 'admin'
        })

        const decoded = await sut.validUserToken(
            jwt as string
        )

        expect(decoded).toMatchObject({
            guestId: 'fakeSession',
            account: 'fake',
            role:'admin'
        })

        const diffInSeconds = decoded.exp - decoded.iat
        const diffInHours = diffInSeconds / 60 /60
        expect(diffInHours).toEqual(1)
    })
})
