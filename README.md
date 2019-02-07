# csv-viewer
This Repository is setup and used for the traning lessons of ccd-school.


## Usage
This application is build without any dependencies!
Just clone Repository and run the following command in the project root:
```javascript
npm start YOUR_CSV_FILE.csv
```
or
```javascript
npm run csvviewer YOUR_CSV_FILE.csv
```

### Examples 
#### With sample file
```javascript
npm run csvviewer personen.csv
```

#### With a specific page size 
(default=10)
```javascript
npm run csvviewer personen.csv 40
```

## Testing
### Preparation
Before you're able to run tests, you need to run the install comannd first:
```javascript
npm install
```
### Execution
Then you're able to execute the tests:
```javascript
npm run test
```

