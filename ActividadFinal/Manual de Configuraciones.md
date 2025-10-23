# SERVIDOR DE VIRTUALIZACION
Se utilizo una maquina virtual la cual contenia windows server 2012 para el servidor.
- como clientes: una maquina virtual con windows 10 y otra maquina virtual con ubuntu 24 como cliente linux

## Configuracion del servidor
Tiene dos adoptadores de red
- Adaptador NAT: funciona para tener acceso a la red.
- Adaptador Interno: funciona para conectarse todas las computadores que se conecten al servidor (clientes).

## Configuracion de los clientes
Unicamente cuentan con un adaptador de red interno, con esto se conectaran al servidor

## Configuracion de las ip's del servidor:
<img width="1060" height="802" alt="image" src="https://github.com/user-attachments/assets/eda05ad2-f75d-49e9-8f76-9a6dbcb591a6" />

La ip del servidor es 192.168.0.2 a esta se conectaran todas las computadoras mientras que la ip del adaptador NAT es el predeterminado

## Configuracion de las ip's de los clientes:
<img width="1099" height="811" alt="image" src="https://github.com/user-attachments/assets/c91db484-f1d5-429d-9a21-4df619e28bc0" />

Esta se asigna automaticamente gracias a las ip's dinamicas que se explicara posteriormente, al inicio se configura con una ip que se encuentre en la misma red de nuestro servidor (192.168.0)
esto para que nuestro dispositivo sea capaz de entrar al dominio de nuestro servidor.

# CREACION DEL SERVIDOR
Inicaremos nuestra maquina con windows server, en la ventana que se nos abre al iniciar, iremos a la pestaña administrar luego agregar roles y caracteristicas y aqui
iniciaremos con la configuracion inicial de nuestro servidor al cual le pondremos servidor1.com, con esto ya podremos configurar nuestro servidor.

## Configuracion DNS y AD
Seguiremos lo descrito anteriormente y ahora accederemos a otra ventana seleccionando nuestro servidor creado anteriormente y marcaremos la opcion DNS, luego lo instalaremos
y con esto ya quedara configurado
<img width="1066" height="806" alt="image" src="https://github.com/user-attachments/assets/49b7859f-ac91-4e86-b7e1-dc3d83be55ba" />

## Creacion de cuentas de usuario
Seleccionaremos la opcion herramientas y luego buscaremos usuarios y equipos de Active Directory, aqui ubicaremos nuestro servidor creado le daremos click derecho, luego nuevo y luego usuario
<img width="1134" height="796" alt="image" src="https://github.com/user-attachments/assets/7c245257-26d8-443d-b093-320a0133618d" />
<img width="1077" height="796" alt="image" src="https://github.com/user-attachments/assets/5ca66a5c-82d8-4924-bf29-0edadfca0197" />
y se nos abrira una ventana en la cual ingresaremos la informacion de nuestro usuario
En este ejemplo crearemos 3 usuarios, 2 usuarios normales y 1 con permisos de administrador, este nos servira para que nuestra maquina pueda unirse al dominio del servidor.
<img width="1093" height="817" alt="image" src="https://github.com/user-attachments/assets/9ef17412-b5f6-49f1-9be8-65e746f82b61" />

## Añadiendo nuestra computadora al dominio
Iniciaremos nuestra maquina virtual con windows 10, iniciaremos con cualquier usuario, aqui en el buscador buscaremos Acceder al trabajo o colegio y abriremos la opcion que sale
<img width="1186" height="805" alt="image" src="https://github.com/user-attachments/assets/2326a687-0719-42ef-8830-2f03d2482773" />
Aqui le daremos en conectar y reconocera automaticamente el servidor, nos permitira que utilizemos credenciales de administrador para poder conectarnos y usaremos las creadas anteriormente
con esto nuestra compu se conectara y se reiniciara y ya podremos iniciar sesion con los otros 2 usuarios creados anteriormente.
<img width="1069" height="795" alt="image" src="https://github.com/user-attachments/assets/217963eb-3332-47fe-be4d-9a3934b145b7" />

# POLITICAS DE GRUPO (GP)
Configuraremos dos politicas de grupo, una que hara que el fondo de pantalla de nuestros usuarios registrados sea el logotipo de la USAC, y el otro que en el escritorio colocara un vinculo
que nos llevara a un servidor web que se explicara despues.

## Configuracion de la politica de grupo para el fondo de pantalla
Primeramente descargaremos la imagen que usaremos y la pondremos en una carpeta que tengamos correctamente ubicada
luego iremos otra vez a nuestro menu del servidor, aqui iremos a herramientas y luego administracion de directivas de grupo y se nos abrira el siguiente menu
<img width="1059" height="802" alt="image" src="https://github.com/user-attachments/assets/1343935e-6f9f-48cd-9442-e02298c41ad0" />
Aqui buscaremos nuestro servidor, le daremos click derecho y luego en crear una nueva directiva de grupo, colocamos el nombre que queramos y luego nos aparecera lo siguiente
<img width="1087" height="812" alt="image" src="https://github.com/user-attachments/assets/204e70dc-6a2c-40a4-81cd-d065e99634b2" />
Aqui para seleccionar el fondo de pantalla que queramos le damos en tapiz del escritorio y seleccionamos la imagen que queramos

## Configuracion de la politica de grupo para colocar un vinculo en el escritorio
Seguiremos el mismo procedimiento solo que ahora abriremos el siguiente menu
<img width="1141" height="791" alt="image" src="https://github.com/user-attachments/assets/4fd70b2a-26f6-48b8-be0b-4feb20fe24e7" />
y aqui colocamos el nombre que queremos que tenga el icono asi como hacia donde queremos que nos redirija en este caso sera al servidor web.
<img width="1083" height="801" alt="image" src="https://github.com/user-attachments/assets/9babfcb0-f9a3-4bce-8d54-958c5a83ab04" />

# CONFIGURACION DE IP'S DINAMSICAS
Iremos a Administrar luego roles y caracteristicas y instalaremos servidor DHCP
<img width="1123" height="811" alt="image" src="https://github.com/user-attachments/assets/33c4d8c2-a107-4522-9e98-665af014ea1a" />
Luego iremos a herramientas y aqui buscaremos DHCP y se nos abrira el siguiente menu
<img width="1105" height="812" alt="image" src="https://github.com/user-attachments/assets/38146c39-35ec-490b-9349-60cf21d371c4" />
Aqui buscaremos nuestro servidor luego seleccionaremos ipv4, y aqui le daremos click derecho y luego en nuevo ambito, e ingresaremos lo que nos pida y las configuraciones que queramos
en este caso se hizo lo siguiente:
<img width="1089" height="801" alt="image" src="https://github.com/user-attachments/assets/b5fe2379-ef50-4d47-84f8-e3ad44dbbd99" />
Se asignaron como ip's dinamicas desde 192.168.0.0 hasta 192.168.0.100 y se reservaron las ip's desde 192.168.0.0 hasta 192.168.0.25
por lo tanto al conectarse nuestra computadora o una nueva compuntadora deberia de obtener la ip 192.168.0.25 y asi sucesivamente hasta llegar a 192.168.0.100

# RECURSOS COMPARTIDOS
En el administrador iremos al disco local C y ahi crearemos dos carpetas
Carpeta Publica y Carpeta Privada
Luego en cada una le daremos click derecho, propiedades, compartir, luego otra vez compartir y aqui seleccionaremos a quien compartirla, en este caso a todos los usuarios
luego iremos a uso compartido avanzado aqui seleccionaremos con que nombre queremos que se comparta y que permisos atorgaremos, en este caso haremos que la carpeta publica
sea editable por todos los usuarios mientras que la carpeta privada unicamente sera editable por un usuario nuevo creado el cual se llama privado.
Para acceder como cliente tenemos varias opciones:
- presionar win + r y luego escribiremos \\'Nombre de nuestro servidor' y esto nos abrira todas las carpetas compartidas por el servidor
  <img width="1132" height="800" alt="image" src="https://github.com/user-attachments/assets/01d87cd8-5600-41f9-adc4-cae722502d09" />
- podemos abrir el explorador de archivos, luego darle click derecho y aqui seleccionar agregar una ubicacion de red e ingresaremos el servidor asi como la locacion de la carpeta compartida
  esto nos generara una especie de acceso directo
  <img width="1093" height="789" alt="image" src="https://github.com/user-attachments/assets/83446340-af76-458b-a95b-327c5da32ce3" />
Para evitar que el cliente tenga que hacer esto, con directivas de grupo el servidor puede hacer que estas carpetas aparezcan.

# SERVIDOR DE CORREO ELECTRONICO
Primeramente crearemos 2 nuevos usuarios llamados correo1 y correo2, luego tenemos que implementar 2 servicios (POP3, SMTP), pero por problemas de compatibilidad en lugar de instalarlo
directamente en active directory utilizaremos otra aplicacion llamada hMailServer, la instalaremos desde la pagina oficial y seguiremos los pasos que dice, esta automatica reconocera nuestro servidor
y nos saldra lo siguiente
<img width="1080" height="805" alt="image" src="https://github.com/user-attachments/assets/09fe3698-943a-4d7e-b0d9-820729b55fc8" />
Iniciaremos sesion y buscaremos nuestro servidor, luego le daremos en accounts y agregaremos los usarios creados anteriormente
<img width="1074" height="792" alt="image" src="https://github.com/user-attachments/assets/9ed29c2a-f33d-439b-8c59-aed6ddb73d7a" />
Luego para probar que todo funcione correctamente utilizaremos Thunderbird el cual nos servira para enviar y recibir los correos
<img width="1199" height="803" alt="image" src="https://github.com/user-attachments/assets/f1addf12-2ed2-41db-b90d-a20eb0b7a60b" />
Aqui le daremos en Email y eso nos permitira agregar una nueva cuenta e ingraremos la informacion que nos pida, es importante aclarar que al iniciar la instalacion nos pedia un puerto para el servicio
POP3 y SMTP y usamos los predeterminados asi que es importante que al agregar el usuario a Thunderbird verifiquemos que si se esten usando los mismos puertos
<img width="1093" height="817" alt="image" src="https://github.com/user-attachments/assets/fff5b6e1-d522-4c7c-b9f2-6bf28e8a6bfa" />
Una vez agregados podemos probar a enviar correos y veremos como el otro usuario los recibe

# SERVIDOR WEB
Iremos a Administrar luego a Agregar Roles y Caracteristicas y agregaremos las siguientes:
<img width="1109" height="814" alt="image" src="https://github.com/user-attachments/assets/15a1446a-a594-417c-af94-6a1323ad7c19" />
Para ahorrarnos trabajo podemos seleccionar todas las de servidor web, aunque en la imagen se muestran las minimas necesarias.
Luego para la configuracion iremos a Herramientas y seleccionaremos Administrador de Internet Information Services (IIS)
Aqui seleccionaremos nuestro servidor luego en sitios y luego agregar sitio  y seguiremos un procedimiento similar al de las carpetas publicas y privadas
Desde el servidor iremos al disco local C, luego a la carpeta inetpub luego a la carpeta wwwroot y aqui procederemos a creer nuestras carpetas asi como el index de la pagina
<img width="1095" height="805" alt="image" src="https://github.com/user-attachments/assets/4f3cdee9-ae01-4dcf-8791-2688d72dc690" />
dentro de cada carpeta igualmente se encuentra otra pagina web a la cual nos podemos redirigirnos desde la principal
luego volveremos al menu anterior de Administrador de Internet Information Services (IIS) y aqui seleccionaremos el Defaul Web Site y le daremos click derecho
luego en agregar directorio virtual 
<img width="1022" height="721" alt="image" src="https://github.com/user-attachments/assets/d63e7407-23d2-4e8e-95af-8807c2214002" />
y aqui seleccionaremos los campos con la informacion que nos pide y con esto se creara nuestro servidor web al cual podemos ingresar por medio del navegador ingresando la ip del servidor
<img width="1105" height="847" alt="image" src="https://github.com/user-attachments/assets/d48f8c0e-4d16-4c79-8519-52ce60b50040" />

# SERVIDOR FTP
Iremos a Administrar luego a Agregar Roles y Caracteristicas y agregaremos las siguientes:
<img width="333" height="40" alt="image" src="https://github.com/user-attachments/assets/bb047db2-c7ae-4e28-b41f-3cded2b0b00f" />
luego iremos al menu que usamos anteriormente y aqui procederemos a crear el servidor fpt dandole al servidor luego a sitios, click derecho y luego agregar sitio FTP y colocaremos la informacion
que nos pide y con esto se creara
<img width="1094" height="801" alt="image" src="https://github.com/user-attachments/assets/bb881d60-44f3-4ea7-8b9e-8c6311bc87d9" />
En este caso se selecciona la carpeta publica anteriormente creada como ruta fisica
luego para acceder como un cliente iremos al explorador de archivos y pondremos ftp://192.168.0.2
 y aqui nos pedira nuestras credenciales para iniciar y luego podremos observar las carpetas compartidas
<img width="1112" height="790" alt="image" src="https://github.com/user-attachments/assets/885b3f7c-a28b-41b0-8fd8-2883eca5d82f" />
<img width="877" height="649" alt="image" src="https://github.com/user-attachments/assets/bab0ad7b-68aa-49b0-8e83-03ab217c4e8a" />

# SERVIDOR VOIP
Para esto nos apoyaremos de una aplicacion externa llamada SipServer, la instaremos desde el sitio oficial y seguiremos los pasos que nos indique la instalacion y llegaremos a este menu:
<img width="1116" height="809" alt="image" src="https://github.com/user-attachments/assets/e88c2367-233c-4da9-88c7-03e9f750c87e" />
Desde este menu podemos observar como se establecio correctamente la conexion y que se encuentra actualmente en funcionamiento, en el menu superior seleccionaremos local users y crearemos nuestros usuarios
Una vez realizado esto podemos ir a la parte del cliente 
Aqui instalaremos Zoiper5 e iniciaremos sesion con los usuarios creados anteriormente en SipServer y luego colocaremos la ip del servidor y  automaticamente nos conectara al servidor
<img width="1114" height="796" alt="image" src="https://github.com/user-attachments/assets/d207074f-bb73-4936-aa6f-c9bb51304214" />
<img width="1076" height="804" alt="image" src="https://github.com/user-attachments/assets/78ff2019-a16c-4f17-840d-a39456697f8d" />
<img width="1137" height="798" alt="image" src="https://github.com/user-attachments/assets/207f2429-0477-4244-b0fa-605a63c16269" />

Cliente Linux
Seguiremos los mismos pasos
<img width="1306" height="902" alt="image" src="https://github.com/user-attachments/assets/c31778bb-a96d-443e-be2c-d29aa539e64a" />

Una vez agregados como contactos procederemos a realizar la llamada
<img width="1919" height="839" alt="image" src="https://github.com/user-attachments/assets/632cd6d7-8509-47d8-8f04-c8fd77762d89" />















 











