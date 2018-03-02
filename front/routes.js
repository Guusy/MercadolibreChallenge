const routes = require('next-routes')()
 
routes
.add('itemsSearch', '/items', 'itemsSearch')
.add('items', '/items/:id','item')


module.exports= routes
