## Deploy Solidity
Install dependencies
```
# .env 파일에 본인의 private_key로 설정
$ cp .env.sample .env
# 배포를 위한 package 설치
$ npm i
```

Deploy
```
$ truffle develop
...
> compile
> migrate
...

$ truffle deploy --network baobab --reset
```

## Run client

```
$ cd client
$ npm i
$ npm run start
```
