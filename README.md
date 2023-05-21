# Nodepop (Práctica de backend avanzado)

La API ha sido generada utilizando express:

    ```
    npx express-generator nodepop --ejs
    ```

1. Es necesario tener la BBDD de mongoDB levantada.
   - Para mac utilizamos: mongodb-macos-x86_64-6.0.4
   - Se puede levantar con:
     ```sh
     ./bin/mongod --dbpath ./data
     ```
2. Para inicializar la BBDD de ejemplo lanzamos:

   ```sh
   npm run inicializarBBDD
   ```

   Nos lanzará un script que cargaré el fichero anuncios.json

3. Para levantar la api, instalamos las dependencias:

   ```sh
   npm install
   ```

   Después para la versión en desarrollo.

   ```sh
   npm run dev
   ```

   Para la versión en producción:

   ```sh
   npm run start
   ```

4. Para conectar con la api, recomendamos utilizar Postman.

   - El endpooint para la api:
     - [http://localhost:3030/api/anuncios](http://localhost:3030/api/anuncios)
   - Para indicar el número máximo de resultados utilizamos el parámetro _limit_
     - [http://localhost:3030/api/anuncios?limit=1](http://localhost:3030/api/anuncios?limit=1)
   - Para ofrecer la paginación utilizamos la combinación de _limit_ y _start_
     - [http://localhost:3030/api/anuncios?limit=1&start=2](http://localhost:3030/api/anuncios?limit=1&start=2)
   - Para ordenar utilizamos _sort_, por ejemplo por precio
     - [http://localhost:3030/api/anuncios?sort=precio](http://localhost:3030/api/anuncios?sort=precio)
   - Para filtrar sólo por ventas
     - [http://localhost:3030/api/anuncios?venta=true](http://localhost:3030/api/anuncios?venta=true)
   - Sólo compras
     - [http://localhost:3030/api/anuncios?venta=false](http://localhost:3030/api/anuncios?venta=false)
   - Para filtrar por _tag_
     - [http://localhost:3030/api/anuncios?tag=motor&tag=work](http://localhost:3030/api/anuncios?tag=motor&tag=work)
     - Nota, el filtro aplicará un OR, motor o work.
     - Se pueden añadir tantos como se consideren.
   - Para filtrar por el nombre del artículo _aticulo_
     - [http://localhost:3030/api/anuncios?articulo=Jor](http://localhost:3030/api/anuncios?articulo=Jor)
     - Nota, el filtro aplicará un contiene del texto, sin distinguir entre mayúsulas y minúsculas.
   - Todos los filtros y opciones pueden combinarse y se indicarán a través de query params.

5. Para acceder a la versión web:
   - Nodepop
     - [http://localhost:3030/](http://localhost:3030/)
   - Para acceder directamente al catálogo
     - [http://localhost:3030/anuncios](http://localhost:3030/anuncios)
     - Será posible filtrar por artículo.
     - También todos los filtros, paginación y orden se podrán introducir en la query string de forma manual.

**Notas**:

- El filtro por tag, si indicamos varios aplica un OR.
  Parece más cómodo que los criterios por tags sean los que se indican para poder buscar múltiples artículos buscando por sus tags.
- El filtro por artículo, no distingurá entre mayúsculas y minúsculuas.
  Busacará el texto en la descripción, en cualquier posición, aplicará un contiene.

### Notas durante el desarrollo:

- Token caducado

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDY5MTBkMTM0NDA0ODc3NzRlYmVkYzkiLCJpYXQiOjE2ODQ2NjA2NjcsImV4cCI6MTY4NDY2MDY2N30.OZOnYQ8XAZ7I1l5hqw6903NH-mH6dxLu8KY7Sb4tZak
```
