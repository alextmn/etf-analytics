ng build --prod --base-href dist/trading-signals
ren dist\cognitive-ui dist\trading-signals
# remode base url in dist/index.html
scp -r dist root@w3.cognitiveanalytics.us:/var/www/html 
