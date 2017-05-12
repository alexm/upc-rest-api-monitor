# Server Monitoring REST API

This is a practical example for the
*REST API design and programming*
class at:

```
Servei de Desenvolupament Professional
Universitat Politècnica de Catalunya
UPC BarcelonaTech
```

## Requirements

You need a recent version of Node (0.10.x) and NPM:

```
sudo apt-get install nodejs nodejs-legacy npm
```

You can set your NPM installation prefix to avoid installing modules as root:

```
mkdir $HOME/npm
echo "prefix = $HOME/npm" >> ~/.npmrc
```

Finally, you need to install the following modules globally:

*   Swagger Node integration: `npm install -g swagger`
*   Mocha for test coverage: `npm install -g mocha`
*   Test coverage: `npm install -g istanbul`

## Usage

*   Local Swagger editor: `swagger project edit`
*   Run server: `swagger project start`
*   Tests (make sure the server is stopped before running tests):
    *   Run all tests: `npm test`
    *   Run selected tests: `_mocha test/api/controllers/monitors.js`
    *   Test coverage: `npm run-script cover`
    *   Test coverage report: `xdg-open coverage/lcov-report/index.html`
