DOCKER_EXEC=docker exec -it
DOCKER_EXEC_COMMAND=docker exec -it ladys-npm-base sh -c

npm-ci:
	$(DOCKER_EXEC_COMMAND) "npm ci"

npm-install:
	$(DOCKER_EXEC_COMMAND) "npm i $(name)"

npm-install-dev:
	$(DOCKER_EXEC_COMMAND) "npm i $(name) --save-dev"

npm-remove:
	$(DOCKER_EXEC_COMMAND) "npm remove $(name)"

npm-start:
	$(DOCKER_EXEC_COMMAND) "npm run start"

npm-build:
	$(DOCKER_EXEC_COMMAND) "npm run build"

npm-publish:
	$(DOCKER_EXEC_COMMAND) "npm run publish"

exec:
	$(DOCKER_EXEC) ladys-npm-base /bin/bash