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

### ShopCategory: 料理区分情報

| フィールド | 型 | Null | Extra | 説明 |
| --- | --- | --- | --- | --- |
| id        | int          | NO   | AUTO_INC | 管理ID |
| parent_id | int          | YES  |          | 親区分ID |
| name      | varchar(100) | NO   |          | 区分名 |
