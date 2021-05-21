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

- kaikas 플러그인 설치 안되었으면 설치 페이지 이동
