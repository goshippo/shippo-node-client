REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
    --reporter spec \

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha \
    --reporter spec \
    --growl \
    --watch

.PHONY: test test-w