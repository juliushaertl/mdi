# Updating icons

## 1. Update Algolia Index

1. Download metas

https://raw.githubusercontent.com/Templarian/MaterialDesign-SVG/master/meta.json

2. Clear Algolia index records

- Go to Index, clear all records.
- Add new records by uploading `meta.json`

## 2. Update front

- Update @mdi/font package 

 > npm install @mdi/font@latest --save --save-exact

- Deploy (push to master)