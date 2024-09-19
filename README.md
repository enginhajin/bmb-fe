# 📗 図書管理サービス bmb(bookmybook) 
<img src="https://i.esdrop.com/d/f/8vpuvvaxBD/BN88D9TPzZ.jpg" width="100%"/>

**bmb project front-end repository**
- Site URL : https://bmb-project.vercel.app/
- Notion URL : https://observant-cheetah-dc4.notion.site/bmb-project-0e4cf89411834ef3bfd297b304bcd9ea

<br/>

## 目次 ##
1. [開発期間](#開発期間)
2. [機能詳細](#機能詳細)
3. [技術スタックとツール](#技術スタックとツール)
4. [システムアーキテクチャ](#システムアーキテクチャ)
5. [サービス画面](#サービス画面)
6. [メンバー](#メンバー)

<br/>

## 開発期間 ##
2024.07.24 - 2024.09.03(41日)

<br/>

## 機能詳細 ##
### USER ###
**アカウント作成**
- id, password, nicknameを入力して会員登録
- idとnicknameは重複をチェック
- validation check
  - 全部必須項目
  - idは英語+数字4字以上10字以下
  - nicknameは日本語と英数字のみ2字以上10字以下
  - passwordは英語+数字or特殊文字8字以上15字以下

**ログイン**
- JWT(Access Token, Refresh Token), local storage, zustand 活用
- ‘USER’, ‘ADMIN’でRoleについて機能およびページ制限

**サインアウト**
- サインアウトするとstore, local storage, cookieにある access token, user info, refresh tokenを削除した後ログインページにページ遷移

### BOOK ###
**図書リスト(USER,ADMIN)、お気に入りリスト、貸出リスト(USER)**
- GET parameterでページの情報、図書の検索情報を送信、バックエンドからデータを受信
- キーワード(ALL)、タイトル、作家、出版社カテゴリで区分して図書を検索可能
- 1ページに12個ずつ、数字をクリックすると該当ページに遷移、＜＞でページ5個ずつ1グループずつ移動可能
- ユーザーはリストで図書のstatus(貸出,貸出不可,返却)を見ることができて、お気に入りリストに追加, 削除、そして図書の貸出、返却が可能
- アドミンは図書status(保有中,貸出中)と貸出状況を閲覧でき、図書の削除が可能
  
**図書詳細(USER, ADMIN)**
- title, isbn, thumbnail, author_name, publisher_name, published_date, description, statusなど図書の全体情報を閲覧することができる (+アドミンはloansで貸出状況追加)
- リストに遷移可能(history.back)

**図書登録(ADMIN)**
- title, isbn, thumbnail, author_name, publisher_name, published_date, descriptionを作成してform-dataに転送して図書登録
- validation
  - 全部必須項目
  - isbnは13字の数字のみ
  - thumbnailのイメージはjpeg、jpg、pngで500kb以下のみ
  - published_dateは有効な日付形式か、今日以降の日付は登録不可
  - descriptionは1000字以下

**図書削除(ADMIN)**
- 貸出リストがない場合、図書削除が可能

<br/>

## 技術スタックとツール ##
### フロントエンド ###
Typescript, React, Next.js, Npm, Zustand, Axios, TanStack Query, React hook form, Zod, Tailwind css, Shadcn/ui, ESLint, Prettier, Husky & LintStaged, Vercel, VS Code

### バクエンド ###
Java, Spring Boot, Hibernate, Spring Data JPA, Spring Security, JWT, Gradle, h2, Maria DB, AWS EC2, S3, Route 53, IntelliJ

### ツール ###
Git, Notion, Slack

<br/>

## システムアーキテクチャ ##
<img src="https://i.esdrop.com/d/f/8vpuvvaxBD/3oz37jYJQO.jpg" width="800"/>

<br/>

## サービス画面 ##
### アクセス権限案内 ###
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/p8TiiJzk9b.png" width="200"/>
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/SmGAHQN9vG.png" width="200"/>
</div>

- ログイン/アカウント作成ページ以外にログインされていない場合は、案内ダイアログを表示し、ボタンを押すとログインページに遷移します。
- ユーザーがアドミンページにアクセスした場合、プレーズが変わりボタンを押すと図書リストページに遷移します。

<br/>

### ログインページ ###
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/GJP7UrEybl.gif" width="200"/>
</div>

- id/passwordが一致しない場合、エラーメッセージを出力します。
- テストアカウント情報トグルがあります。

<br/>

### アカウント作成ページ ###
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/6QCg5DFXk9.gif" width="200"/>
</div>

- id、password、nickname有効性チェックをして通過した場合、submitボタンが活性化になります。
- アカウントの作成が完了したらログインページに遷移します。

<br/>

### サインアウト ###
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/MrtKNUKaJC.gif" width="200"/>
</div>

- サイドバーメニューのサインアウトボタンを押すとサインアウト後、ログインページに遷移します。

<br/>

### 図書リストページ(main) ###
**USER**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/VueOG1p8w1.gif" width="600"/>
</div>

- grid形式で図書リストを表示します。
- キーワード(ALL)、タイトル、作家、出版社別に図書検索ができます。
- 図書status(貸出,貸出不可,返却)を見ることができ、お気に入りリストへ追加、削除、図書の貸出、返却ができます。

<br/>

**ADMIN**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/yWWI6Y5IQe.gif" width="600"/>
</div>

- 図書status(保有中,貸出中)と貸出状況を閲覧でき、貸出記録がない場合は、図書の削除ができます。

<br/>

### 図書詳細ページ ###
**USER**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/j2Jerw1uYJ.gif" width="600"/>
</div>

- 図書の全体情報を閲覧することができます。お気に入りリストへ追加、削除、図書の貸出、返却ができます。

<br/>

**ADMIN**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/9Dpv4JQWlh.gif" width="600"/>
</div>

- 図書の全体情報と貸出状況も一緒に閲覧できます。

<br/>

### お気に入りリストページ ###
**USER**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/gGfPsxivX3.gif" width="600"/>
</div>

- いいねボタンを押した図書を見られます。
- お気に入りリストから削除できます。
- 図書の貸出、返却ができます。

<br/>

### 貸出リストページ ###
**USER**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/tTl2hn6joV.gif" width="600"/>
</div>

- 貸出中の図書を見られます。
- お図書返却ができます。

<br/>

### 図書登録ページ ###
**ADMIN**
<div style="display: flex;">
  <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/QZMNMPVEKR.gif" width="600"/>
</div>

- 全体アイテムの有効性チェックを行い、エラーメッセージを出力します。
- 登録ボタンを押すと最終確認ダイアログを出力し、同意すれば登録します。
- 登録した後はformをリセットします。

<br/>

## メンバー ##

<table style="width: 400px;">
  <tr>
    <th>柳河賑(リュ・ハジン, Hajin Ryu)  /  FE, PL</th>
  </tr>
  <tr>
    <td>
       <img src="https://i.esdrop.com/d/f/8vpuvvaxBD/2GTsQGFdHs.jpg" width="200"/>
    </td>
  </tr>
  <tr>
    <td>enginhajin@gmail.com</td>
  </tr>
  <tr>
    <td>https://github.com/enginhajin</td>
  </tr>
  <tr>
    <td> Notion文書作成、機能仕様書作成、FEの技術スタック選定、<br/>
      FEの開発環境セッティング、画面の設計と実装、API連携、<br/>
      FEをVercelでデプロイ、Githubセッティング、<br/>
      BEをAWSのEC2とS3でデプロイ、BEのCI/CD構築、<br/>
      DB設計、API設計、API仕様書作成</td>
  </tr>
</table>


