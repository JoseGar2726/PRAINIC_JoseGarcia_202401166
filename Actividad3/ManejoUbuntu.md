# INSTALACIÓN SISTEMA OPERATIVO UBUNTU 24.04.3

Para esto utilizaremos el tutorial hecho en la actividad 2:
(https://www.youtube.com/watch?v=RA6jxsJbC2w)

# COMANDOS BASICOS DE LA TERMINAL DE UBUNTU 24.04.3

## Navegacion entre archivos:

1. pwd - Muestra el directorio actual (Print Working Directory)

   <img width="934" height="75" alt="image" src="https://github.com/user-attachments/assets/bb10e121-4600-4ec2-bf1d-40d9e9753962" />
   
2. cd - Cambiar de directorio (Change Directory)
   
   <img width="937" height="117" alt="image" src="https://github.com/user-attachments/assets/af3b7d3e-d29d-44ce-a220-515372620c33" />


## Para ver el contenido de un directorio:

1. ls - Listar archivos y directorios

   <img width="929" height="135" alt="image" src="https://github.com/user-attachments/assets/67c05136-bd12-48ee-ac6c-ab1fe8a8179b" />


## Para crear carpetas en un directorio:

1. mkdir - Crear directorios (Make Directory)

   <img width="869" height="86" alt="image" src="https://github.com/user-attachments/assets/fa3854aa-6587-4e0a-bc27-36c95b616319" />


## Para copiar archivos y carpetas:

1. cp - Copiar archivos y directorios (Copy)

   <img width="924" height="110" alt="image" src="https://github.com/user-attachments/assets/49f06bde-8185-4b7e-8165-78aacdfdcc42" />


## Para mover/renombrar archivos y carpetas:

1. mv - Mover o renombrar archivos (Move)

   <img width="920" height="118" alt="image" src="https://github.com/user-attachments/assets/e910b376-9cbd-4bc8-ab3e-b27073c87162" />


## Para eliminar archivos y carpetas:

1. rm - Eliminar archivos y directorios (Remove)

   <img width="826" height="113" alt="image" src="https://github.com/user-attachments/assets/4144132e-a8e8-4445-bd66-1866ab1ba90f" />


## Para ingresar como Superusuario:

1. sudo - Ejecutar comandos como superusuario

   <img width="865" height="110" alt="image" src="https://github.com/user-attachments/assets/3aeabbba-1a44-48ee-aebf-dc151eeafe69" />


## Para actualizar permisos:

1. chmod - Cambiar permisos de archivos/directorios

   <img width="783" height="107" alt="image" src="https://github.com/user-attachments/assets/7826cbf9-cff8-4203-ac26-fdbe76e0d78a" />

2. chown - Cambiar propietario de archivos

   <img width="893" height="55" alt="image" src="https://github.com/user-attachments/assets/69656bd6-ee20-45e1-af67-7fe8988cc098" />


## Para crear/editar archivos de texto:

1. nano - Editor de texto simple

   <img width="920" height="131" alt="image" src="https://github.com/user-attachments/assets/9ccbdf41-981b-4dc2-8419-3be725a51877" />

2. vim - Editor de texto avanzado

   <img width="914" height="113" alt="image" src="https://github.com/user-attachments/assets/c6272d58-98f5-403f-8e93-927e3024a8f9" />

3. echo y redirección:

   <img width="915" height="59" alt="image" src="https://github.com/user-attachments/assets/f5eea145-bd16-4101-98fe-dce2f41f6569" />


## Para instalar paquetes:

1. apt - Gestor de paquetes de Ubuntu

   <img width="921" height="87" alt="image" src="https://github.com/user-attachments/assets/6e52cf41-baa7-4949-bc0f-f33de4bdc96b" />


## Para actualizar paquetes:

1. apt upgrade - Actualizar paquetes instalados

   <img width="928" height="86" alt="image" src="https://github.com/user-attachments/assets/70a5d2b1-1b58-49af-92e3-a86651e4e96c" />


## Para eliminar paquetes:

1. apt remove - Eliminar paquetes

   <img width="929" height="84" alt="image" src="https://github.com/user-attachments/assets/c46a0d67-03a6-42cb-8d63-facbb41d3754" />


# LEVANTAR UN SERVIDOR DESDE LA TERMINAL DE UBUNTU 24.04.3

1. Instalar el servidor HTTP Apache2

   - sudo apt update: Actualiza la lista de paquetes disponibles
   - sudo apt install apache2: Instala el servidor web Apache2
   - sudo systemctl status apache2: Verificación de instalación -> Debería mostrar "active (running)"
  
2. Ingresar a Localhost en el navegador

   - Abre tu navegador web, escribe en la barra de direcciones: http://localhost
   - Utilizando el comando: curl localhost
  
3. Moverse al directorio /var/www/html/

   - cd /var/www/html/ Nos mueve a la ruta de interes
   - pwd Debería mostrar: /var/www/html verifica si estamos en esa ruta
   - ls -la Verás el archivo index.html y posiblemente otros archivos verifica que exista el archivo index.html
  
4. Modificar el archivo index.html

   - sudo nano index.html
   - Escribir nuestro carnet (202401166) y nombre (José Antonio García Roca)
   - Guardar cambios con: Ctrl + O y luego Ctrl + X
  
5. Verificar los cambios en el navegador
   
   - Actualiza la página http://localhost
   - Utilizando el comando: curl localhost






   
