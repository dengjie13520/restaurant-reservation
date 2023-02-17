import { config } from 'dotenv'

jest.mock('js-yaml', () => ({
    load: () => ({ jwt: { secret: 'yaml' } }),
}))

process.env.JWT_SECRET = 'from env'

import * as path from 'path'

describe('config', () => {
    it("doesn't override env variable", async () => {
        process.env.CMS_URL = 'cms'
        config({
            path: path.resolve(__dirname, '../../../.env.develop'),
            debug: true,
        })
        expect(process.env.MDATA_URL).toEqual('https://dev.api.srm.lego.cn')
        expect(process.env.CMS_URL).toEqual('cms')
    })
})
