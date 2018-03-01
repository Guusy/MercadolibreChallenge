const routes = require('next-routes')()
 
routes
.add('itemsSearch', '/items', 'itemsSearch')
.add('items', '/items/:id','items')


module.exports= routes
