## Deploy Solidity

Install dependencies

```bash
# .env 파일에 본인의 private_key로 설정
$ cp .env.sample .env
# 배포를 위한 package 설치
$ npm i
# 에러 발생시 package-lock.json 파일 삭제 후 npm i 재실행
```

Deploy

```bash
$ truffle develop
...
> compile
> migrate
...

$ truffle deploy --network baobab --reset
```

## Run client

```bash
$ cd client
$ npm i
$ npm run start
```

## 아직 안되어있는 부분

- keystore.json 파일로 로그인
- Kaikas (https://docs.kaikas.io/) 플러그인 사용하여 로그인
- method 호출 event emitter 부분 오류
