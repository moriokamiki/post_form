# Vue OnsenUI Practice

Cordova使ってアプリ作るぞ！（かわせ

## とりあえず動かす

``` bash
# 環境の用意
npm install

# ホットリロード(更新即反映)を用いた再現(localhost:8000)
npm run dev

# ソースコードwebpackにてまとめる
npm run build
```

## 上で実行しているコードの解説
``` bash
npm install
```
これを実行することで現在いるフォルダ内にあるpackage.jsonの中身の環境を再現する<br>
何かピンポイントでインストールしたい場合は<br>
``` bash
npm install 入れたいパッケージ名
```
で可能
<br>
``` bash
npm run dev
```
これの実行によって[ローカルホスト](http:localhost:8000)にて現在のコードが再現される<br>
この状態はソースコードを保存すると即時反映される<br>
<br>
``` bash
npm run build
```
実行後、srcフォルダ内部のソースが全てまとめられ、wwwに配置される<br>
cordovaはwww内の情報をアプリ化するため、これを事前実行することが必須
<br><br>
## 補足情報(重要ワード)
### - cordova
HTML,CSS,JSをアプリ化してくれるフレームワーク Node.jsのパッケージ

### - Node.js
ブラウザではなく、サーバサイドで動かせるJSのフレームワーク

### - npm
Node Package Managerの略 CUI上等でNodeのパッケージを弄る際に使う

### - webpack
ソースコードをひとまとめにしてくれる便利な奴<br>
今回は.vue .js .cssなどをまとめてくれる
