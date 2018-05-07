# Determine Prototype

## A simple node API module for distributing A/B test prototypes across clients.

### Routes
`GET /getPrototype`

returns either A or B
 
`GET /confirmPrototype/:which`

Used to confirmed that this prototype has been finished.

`GET /reset?confirmCode`

Deletes data 

`GET /info`

Returns a simple info-page
