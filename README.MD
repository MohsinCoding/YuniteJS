# Yunite Api Node-JS Wrapper
This is a node-js wrapper with access to all of the Yunite API endpoints.

Docs for official api: https://yunite.xyz/docs/developers/readme

## Code Example
```js
const { YuniteApi } = require('yunite');
const apiToken = 'Your-Api-Token'
const client = new YuniteApi(apiToken)

client.getUserLinks('guildId', {
    type: "DISCORD",
    userIds: [
        "12345678912345873",
        "23456567898765456"
    ]
}).then(response => { 
    console.log(response)
}).catch(err => {
    console.log(err)
})
```