## Lanzamiento de la Aplicacion

### Ejecutar app 
#### Crear base de datos:
1. Abrimos xampp e iniciammos los servidores locales MySQL y Apache
2. Buscamos en nuetro navegador: http://localhost/phpmyadmin/
3. Creamos una nueva base de datos con el nombre "users"
4. Seleccionamos la base de datos creada e importamos el archivo: **"users.sql"**

#### Iniciamos con Node:
1. Abre la *terminal de comandos* en el proyecto.
2. Ejecuta el siguiente comando: "node .\src\app.js"
3. Si todo va bien, mostrara un mensaje asi  **server runnning in port:  4000**
3. Ya podemos buscar en el navegador *http://localhost:4000/*
4. Nos cargargara la pagina inicial de la aplicacion web CRUD.


#### Funcionamiento:
Permite crear, visualizar, editar y eliminar información guardada en una Api local en formato JSON.
Además, la opción en el navbar desplegable de consumir una API rest y guardarla en la base de datos MySQL.
### Eso es todo amigos...
