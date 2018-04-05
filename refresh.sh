rm -rf services/node_modules/commons
cp -r services/commons services/node_modules/commons
docker-compose restart
