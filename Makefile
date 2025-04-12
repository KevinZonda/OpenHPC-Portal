all:
	yarn build

api:
	bash gen_api.sh

install:
	yarn install

i: install

dev:
	yarn dev

.PHONY: api