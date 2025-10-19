# Recall

Plataforma para gestion y control sobre servicio de recoleccion de material reciclable.

## Inicializacion

Guia para inicializar el proyecto, en caso de necesitarla.

Para empezar, tienen que descargar o bajar el proyecto en caso de que no lo hayan hecho. Desde terminal pueden hacerlo buscando una localizacion cualquiera en su disposituvo y ejecutar el siguiente comando en terminal:

```bash
  git clone https://github.com/Manu-DBasto/reCall.git
```

Despues, deberán instalar los paquetes del proyecto. Para ello deben moverse a la carpeta del proyecto y ejecutar el comando de instalacion en el CMD desde la raiz del proyecto:

```bash
  cd reCall
  npm install
```

Con esto ya estaria instalado. Asi que solo tienen que ejecutar el siguiente comando siempre que quieran instalarlo:

```bash
  npx expo start
```

## Consideraciones

Para este proyecto se estará implementando una estructura parecida a la clean architecture. De forma que este más organizado y sea más profesional, asi que hay que tomar en cuenta las siguientes cuestiones.

-   Al hacer pull, usen npm install para verificar que tengan las dependencias instaladas o instalar las que hagan falta.
-   Cuando prueben sus scripts de db siempre tienen que recargar pagina despues de un cambio. Es algo que solo pasa con ellos por que se guardan y no se actualizan de forma dinamica como los componentes
-   Como consejo, revisen bien que son los componentes que importan. Debido a las librerias que estan instaladas para que React Native sea multiplataforma hay componentes que se llaman igual pero provienen de paqueterias distintas y por lo tanto funcionan o se ven diferentes. Por ejemplo: Hay componente Text de React-Native (es el que se debe utilizar), pero tambien hay de react native web o del gesture handler.
-   En la carpeta /src se guardarán los principales archivos para la ejecucion del proyecto (vistas, componentes, hooks y demás.)
-   La carpeta /src/routes/ contiene los archivos con los navigators. Estos basicamente son en donde se configura el funcionamiento y estilo de navegacion. Cuando se deba agregar una vista, se importa ahi mismo y agrega en la función.
-   La carpeta /src/screens/ guarda los archivos principales de las vistas. Osea que estas son las que se exportan a los navigators y en ellas se importan los componentes para construir cada interfaz.
-   En /src/components/ estarán los componentes en si. Es decir, piezas pequeñas de codigo que pueden ser un boton, un modal o un formulario y que se exportan en las screens. Dentro de ella podria haber separacion segun que tipo de dato maneje cada componente (empleado, usuario o material) y los layouts que son componentes generales como un header o Estilos para un titulo.
-   En /src/scripts/ estarán las funciones para el uso de firebase y su base de datos, separados en carpetas por el nombre del dato que manejan.
-   Tambien esta /src/hooks/ que son funciones que pueden ser importadas al codigo y pueden tener distintos fines. FormValues contendrpa diferentes funciones para facilitar el uso y guardado de valores de inputs en formularios, de momento solo hay para tipo texto pero se agregarian más conforme se necesiten. Adeas de uno IMPORTANTE que es useConnect, que guarda variables de inicializacion para firebase y firestore, entonces este se llamrá practicamente en todas sus funciones donde necesiten base de datos.
