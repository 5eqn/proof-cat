.PHONY: cpx test coverage

cpx:
	genese cpx ./src -f react

test:
	npm test

coverage:
	CI=true npm test -- --coverage
