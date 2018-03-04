# Mercadolibre Challenge
[How to use](#how-to-use)
  - [Setup](#setup)

[Technologies](#technologies)
  - [Back End](#back-end)
  - [Front End](#front-end)

[Views](#views)
  - [Search Item](#search-item)

  - [View Item](#view-item)


[Comments](#Comments)


## How to use

### Setup

Clone it:

``` git clone
https://github.com/Guusy/mercadolibreTest
```

To the Backend:

```
cd backend
npm install
npm run dev
```

To the FrontEnd:

```
cd frontend
npm install
npm run dev
```

Ahora la pagina esta corriendo en http://localhost:3000/

## Technologies

### Back End
```
NodeJs,Express
```

### Front End
```
React,Next,Sass
```

## Views

### Search Item

> ![01](./readme-files/responsive-search.gif)

### View Item

> ![02](./readme-files/responsive-item.gif)

# Comments

SEO:
En la carga de la paginas del buscador, tanto como en la del item individual hago la llamada a la api de express en ``` getInitialProps() ```
para que esas llamadas se hagan del lado del server, asi cuando google analiza las paginas no les quita puntos por tener que levantar un browser
para poder ver nuestra pagina, esto le agrega tiempo de carga a la pagina pero se usa nada mas para data vital que sirve para posicionarse mejor.

Perfomance:
En cuanto al enrutamiento de Nextjs a los links generados en la busqueda le agrego la opcion prefecth ```<Link prefetch>``` para que sus debidos assets y html sean precargados
para que al acceder la carga sea mucho mas rapida y tener un mejor experiencia de usuario

Mensajes de error:

http://localhost:3000/items?search=asjdiqiod (busqueda invalida)

http://localhost:3000/items/MLA6218270596 (id invalido)

