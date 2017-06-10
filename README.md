# Confluence Client
A limited client library for confluence.

## Usage

```
var confluence = require('congfluence-client')({
    username: "admin",
    password: "***",
    endpoint: "http://confluence.example.com:8090"
})
confluence.get("SPACE","Page Title", ['body.storage']).then(...)
```


## Functions
All functions returns promises.
### search
Performs cql search.

| Param | Description |
|---|---|
| cql | Cql query |
| expand | Field or fields to expand |

### request
Queries confluence rest API.

| Param | Description |
|---|---|
| path | path to query |
| params | Parameters to pass |

### get
Gets confluence page.

| Param | Description |
|---|---|
| spaceKey | Space key |
| title | Page title | 
| expand | Field or fields to expand |

### properties
Queries page properties.

| Param | Description |
|---|---|
| spaceKey | Space key |
| cql | Cql query to filter source pages| 
| properties | Properties to return |
