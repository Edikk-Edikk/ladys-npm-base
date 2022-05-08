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

npm-publish:
	$(DOCKER_EXEC_COMMAND) "npm run publish"

npm-version-patch:
	$(DOCKER_EXEC_COMMAND) "npm version patch"

npm-check-types:
	$(DOCKER_EXEC_COMMAND) "npm run check-types"

npm-clean:
	$(DOCKER_EXEC_COMMAND) "npm run clean"

npm-copy-css:
	$(DOCKER_EXEC_COMMAND) "npm run copy-css"

npm-watch:
	$(DOCKER_EXEC_COMMAND) "npm run watch"

npm-build:
	$(DOCKER_EXEC_COMMAND) "npm run build"

exec:
	$(DOCKER_EXEC) ladys-npm-base /bin/bash
