
## Description

demo project for reserve table

## Installation

```bash
$ yarn install
```

## Running the app

need install mongo(localhost:27017)  without auth 

```bash
# development
$ yarn run start

# index.html

http://localhost:3000
或项目的view里的index.html可以直接打开访问
首页访问后端的地址是固定的，后端地址变更后需要更改index.html地址变量rootUrl,默认访问"http://localhost:3000/graphql"

#  graphql
http://localhost:3000/graphql

query{
    getTableList
    searchDetailReserve
    searchReserveList
}
mutation{
    addTable
    login   //  admin和guest登录获取token
    registerAdmin
    registerGuest
    reserveTable
    deleteTable
}

一般流程是：
1 注册admin：registerAdmin
2 admin登录获取token：login
3 添加桌子：addTable
4 注册guest：registerGuest
5 guest登录获取token：login
6 查询桌子：getTableList
7 guest预定table：reserveTable
8 guest更新reserve：reserveTable  
9 admin更新reserve：reserveTable  

注意：除了注册和登录，其他graphql都需要在headers里添加token到authorization，如下
{
  "authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiNDU2IiwiZ3Vlc3RJZCI6IkdVRVNUMTY3NjcxNjM4MDk1MV8xOTI1NTMxIiwicm9sZSI6Imd1ZXN0IiwiaWF0IjoxNjc2ODUzMzcyLCJleHAiOjE2NzY4NTY5NzJ9.oSJrO69w1uTTbB9d3MKdocfWkxxdjL0MxfE3HGMnp8E"
}
# restful api

登录

curl --location 'http://localhost:3000/user/login' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'account=456' \
--data-urlencode 'password=123'


## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
