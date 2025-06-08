@echo off
start "" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" ^
  --disable-web-security ^
  --user-data-dir="C:\brave-cors-profile" ^
  "file:///C:/temp/web/index.html"
