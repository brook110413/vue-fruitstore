#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
cd dist

# 部署到自定義網域
# echo 'www.example.com' > CNAME

git init
git add .
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:brook110413/vue-fruitstore.git master:gh-pages

cd -