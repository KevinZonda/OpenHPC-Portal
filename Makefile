api:
	bash gen_api.sh

all:
	yarn build

install:
	yarn install

i: install

dev:
	yarn dev

.PHONY: api