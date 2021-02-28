# vending-machine-backend

## Build Setup

```bash
# install dependencies
$ npm install

# run on development environment
$ npm run dev

# run on production
$ npm run start
```

## API Docs for vending machine
### Buy transaction
 - **Method**: POST
 - **URL**: http://localhost:3002/api/transactions/
 - **Body**: { machineId, productId, action='BUY', amount }
 
### Refill transaction
 - **Method**: POST
 - **URL**: http://localhost:3002/api/transactions/
 - **Body**: { machineId, productId, action='REFILL', amount }
```
 Example request body
	{
    "productId": "17",
    "machineId": "4",
    "action": "BUY",
    "amount": "1"
  }
```
## Socket.IO
#### Join notification room
1. `socket.emit('join', 'notification')`
#### Subscribe event for notification updated
1. ``socket.on('data', <handler function>)`
