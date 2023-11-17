# Server side

## 参考

https://zenn.dev/chida/articles/882d9fb1d71fa1

## テーブル設計

### GeoAddress: 住所情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| jis_code        | int          | YES  |  | JISコード |
| post_code       | varchar(7)   | NO   |  | 郵便番号 |
| prefecture_kana | varchar(90)  | YES  |  | 都道府県ｶﾅ |
| city_kana       | varchar(90)  | YES  |  | 区ｶﾅ |
| town_kana       | varchar(120) | YES  |  | 町ｶﾅ |
| prefecture_name | varchar(90)  | YES  |  | 都道府県名 |
| city_name       | varchar(90)  | YES  |  | 区名 |
| town_name       | varchar(120) | YES  |  | 町名 |

### User: ユーザー情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| id          | int           | NO   |	AUTO_INC | 管理ID |
| name        | varchar(45)   | YES  |  | ユーザー名 |
| email       | varchar(45)   | NO   |  | メールアドレス |
| password    | varchar(60)   | NO   |  | パスワード |
| description | varchar(1000) | YES  |  | 説明 |
| created     | datetime      | YES  |  | 作成日時 |
| updated     | datetime      | YES  |  | 更新日時 |
| locked      | datetime      | YES  |  | アカウントロック日時 |

### UserSession: ユーザーセッション情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| session_id | varchar(128) | NO   |        | トークン |
| expires    | int          | NO   |        | 有効期限 |
| data       | text         | YES  |        | cookieのJSONデータ |

### UserLoginHistory: ログイン履歴情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| user_id    | int          | NO   |   | ユーザーID |
| login      | datetime     | NO   |   | ログイン日時 |
| host_name  | varchar(256) | YES  |   | ログイン時のデバイスのホスト名 |
| user_agent | varchar(512) | YES  |   | 利用ブラウザ |
| status     | int          | NO   |   | ログイン状態 |

### Shop: 店舗情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| id                    | int          | NO   | AUTO_INC | 管理ID |
| name                  | varchar(120) | NO   |          | 店舗名 |
| kana                  | varchar(120) | YES  |          | 店舗名カナ |
| post_code             | varchar(7)   | NO   |          | 郵便番号 |
| address               | varchar(200) | YES  |          | 住所 |
| tel                   | varchar(45)  | YES  |          | 電話番号 |
| holiday               | varchar(45)  | YES  |          | 休日 |
| seats                 | int          | YES  |          | 座席数 |
| price_range           | varchar(20)  | YES  |          | 価格帯 |
| score                 | float        | YES  |          | レビューの平均値 |
| status                | int          | NO   |          | ステータス |
| geolocation_latitude  | float        | YES  |          | 緯度 |
| geolocation_longitude | float        | YES  |          | 経度 |

### ShopReview: クチコミ情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| id          | int      | NO   | AUTO_INC | 管理ID |
| shop_id     | int      | NO   |  | 店舗ID |
| user_id     | int      | NO   |  | ユーザーID |
| score       | int      | YES  |  | レビュースコア |
| visit       | datetime | YES  |  | 訪問日 |
| post        | datetime | YES  |  | 投稿日 |
| description | longtext | YES  |  | 本文 |

### ShopCategory: 料理区分情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| id        | int          | NO   | AUTO_INC | 管理ID |
| parent_id | int          | YES  |          | 親区分ID |
| name      | varchar(100) | NO   |          | 区分名 |

### ShopCategoryMapping: 料理区分のマッピング情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| shop_id     | int  | NO   |    | 店舗ID |
| category_id | int  | NO   |    | カテゴリーID |
