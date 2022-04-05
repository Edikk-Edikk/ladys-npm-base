###Добавляем запуск контейнеров в systemd
```
cd /etc/systemd/system
nano docker-compose-ladys-npm-base.service
```
Содержимое
```
[Unit]
Description=Docker compose ladys npm base
Requires=docker.service
After=docker.service
[Service]
Restart=always
WorkingDirectory=/var/www/porno.ladys/base
ExecStart=/usr/local/bin/docker-compose -f docker-compose.yml up
ExecStop=/usr/local/bin/docker-compose -f docker-compose.yml down
[Install]
WantedBy=multi-user.target
```
```
systemctl enable docker-compose-ladys-npm-base.service
```
