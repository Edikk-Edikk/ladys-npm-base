###Конфигурация
Скопировать конфиг докера
```
cp docker-compose.example.yml docker-compose.yml
```
Указать путь до ssh ключа github в разделе secrets => github => file

Получить токен npm и указать его в переменную environment => NPM_TOKEN
###Добавляем запуск контейнеров в systemd
```
cd /etc/systemd/system
nano docker-compose-ladys-npm-base.service
```
Добавить содержимое и указать имя текущего пользователя
```
[Unit]
Description=Docker compose ladys npm base
Requires=docker.service
After=docker.service
[Service]
User=
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
