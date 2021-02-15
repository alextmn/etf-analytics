ng build --prod --base-href dist/trading-signals
ren dist\cognitive-ui dist\trading-signals
# remode base url in dist/index.html
scp -r dist/cognitive-ui/* root@107.161.173.114:/var/www/html 
