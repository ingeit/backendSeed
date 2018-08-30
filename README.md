# backendSeed

Backend con Express 4
Se implemento un modelo base de Usuario para su CRUD
Consta de:
-jwt auth middleware
-bcrypt
-response
-mysql driver
-test.sql

Se estructuraron los directorios y rutas de una forma conveniente
Se implemento Models y Controllers
Se implemento carpeta config, providers/utils

Backend listo para su uso con login y register para usuarios

# Configuración Proxmox y maquina virtual

* ## Maquina fisica Proxmox:

    1.  ### Administracion WEB: https://dominio:8006

    2.  ### Instalar certificado Let’s Encrypt - ACME
        ![Alt text](/assets/certificadoProxmox.png)
        Al crear el nuevo certificado en la sección ACME, tildar la opcion Accept TOS.

        Redirigir el trafico externo en el Router del puerto 80 al servidor Proxmox (Por las dudas, antes de hacer esto, probar si renueva el certificado).

        En caso de problemas, seguir estos pasos para agrear al navegador el certificado por defecto provisto por Proxmox: https://pve.proxmox.com/wiki/Import_certificate_in_browser

    3.  ### Restaurar certificados por defecto

            // eliminar estos archivos
            rm /etc/pve/pve-root-ca.pem
            rm /etc/pve/priv/pve-root-ca.key
            rm /etc/pve/nodes/<node>/pve-ssl.pem
            rm /etc/pve/nodes/<node>/pve-ssl.key
            rm /etc/pve/local/pveproxy-ssl.pem
            rm /etc/pve/local/pveproxy-ssl.key

            // ejecutar este comando
            pvecm updatecerts -f

        Una vez finalizado lo anterior, volver al paso 1, borrar los certificados de ACME y volver a generarlos
        
        *NOTA:* para ver reflejados los cambios, ejecturar el siguiente comando:

            systemctl restart pveproxy

        *Fuente:* https://pve.proxmox.com/wiki/HTTPS_Certificate_Configuration_(Version_4.x,_5.0_and_5.1)

    4.  ### Creación VM:
        
        + OS:
        ![Alt text](./assets/VMOS.png)
        Para poder listar las imagenes ISO en el menu de la imagen hay que copiarlas en el siguiente directorio:

            /var/lib/vz/template/iso

        + Hard Disk:
        Setear las opciones como se muestra en la imagen
        ![Alt text](./assets/VMHardDisk.png)

        + Network:
        Setear las opciones como se muestra en la imagen
        ![Alt text](./assets/VMNet.png)

    5.  ### En caso de montar el servidor de prueba en una notebook, deshabilitar la suspencion al cerrar la tapa de la misma de la siguiente manera:

            // editar archivo
            nano /etc/systemd/logind.conf

            // agregar la linea (asegurarse que no este comentada #)
            HandleLidSwitch=ignore

            // resetear el servicio de energia
            service systemd-logind restart

* ## **Maquina virtual Ubuntu**

    1.  ### **Usuarios**

        +   **Crear usuario**

                sudo adduser nombre_usuario

        +   **Eliminar usuario**

                // eliminar el usuario y su directorio personal (recomendado)
                sudo deluser --remove-home nombre_usuario

                // eliminar solo el usuario
                sudo deluser nombre_usuario

            *Fuente:* https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04 

        +   **Mostrar grupos al que pertenece**
        
                groups nombre_usuario

            *NOTA:* Mediante los grupos, se puede asignar a un usuario permisos de administrador

        +   **Asignar todos los permisos de administracion a un usuario**
            
                usermod -aG adm cdrom sudo dip plugdev lxd lpadmin sambashare nombre_usuario
            
            *NOTA:* Con el comando *usermod -aG groups nombre_usuario* modificamos los grupos perteneciantes a un usuario

        +   **Asignar solo permisos de sudo (suficiente para que sea administrador)**
            
                usermod -aG sudo nombre_usuario

    2.  ### **SHH: Permitir/Denegar ingreso remoto a usuarios**

        *   ### Editar el archivo 
            **sudo nano /etc/ssh/sshd_config** 
            
            y agregar las siguientes lineas segun necesidad

                // denegar ingreso solo root (recomendado)
                PermitRootLogin no

                // denegar ingreso a usuarios especificos (separados con espacio)
                DenyUsers usuario1 usuario2

                // permitir ingreso a usuarios especificos (separados con espacio)
                AllowUsers usuario1 usuario2

        *   ### Guardar el archivo y resetar el servicio SSH

                sudo service ssh restart

            *Fuente:* https://www.ostechnix.com/allow-deny-ssh-access-particular-user-group-linux/

        *   ### Abrir puertos firewall

                sudo ufw app list

                    // output:
                        Available applications:
                        ...
                        OpenSSH

                sudo ufw allow 'OpenSSH'

                // o permitir el puerto manualmente
                sudo ufw allow 22
                

    3.  ### **Nginx**

        *   ### Instalación

                sudo apt-get update
                sudo apt-get install nginx

            *  ### Ajuste firewall

                sudo ufw app list

                    // output:
                        Available applications:
                        Nginx Full
                        Nginx HTTP
                        Nginx HTTPS
                        OpenSSH

                sudo ufw allow 'Nginx Full'

                // o permitir el puerto manualmente
                sudo ufw allow 80
                sudo ufw allow 443

                // corroborar puertos abiertos
                sudo ufw status

                    //output
                        Status: active
                        To                         Action      From
                        --                         ------      ----
                        OpenSSH                    ALLOW       Anywhere                  
                        Nginx Full                 ALLOW       Anywhere                  
                        OpenSSH (v6)               ALLOW       Anywhere (v6)             
                        Nginx Full (v6)            ALLOW       Anywhere (v6)

            *   ### Comandos útiles

                    // verificar el estado del servicio
                        systemctl status nginx
                    // detener servicio web
                        sudo systemctl stop nginx
                    // iniciar servicio web
                        sudo systemctl start nginx
                    // detener e iniciar el servicio
                        sudo systemctl restart nginx
                    // recargar servicio
                        sudo systemctl reload nginx
                    // desactivar servicio de inicio automatico
                        sudo systemctl disable nginx
                    // habilitar servicio de inicio automatico
                        sudo systemctl enable nginx

            *Fuente:* https://www.digitalocean.com/community/tutorials/como-instalar-nginx-en-ubuntu-16-04-es

        * ### Agregar virtual host para servir paginas web (no es necesario para nuestra arquitectura)

            *Fuente:* https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04

        * ### Reverse Proxy

            *   Generar un archivo de "Server Block"

                    sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/ejemplo.com

            *   Editar el archivo
            
                **sudo nano /etc/nginx/sites-available/ejemplo.com**

                    // agregar lo siguiente
                    
                    server {
                        listen 80;

                        server_name ejemplo.com;

                        location /backend_1/ {
                            proxy_pass http://localhost:3000;
                            proxy_http_version 1.1;
                            proxy_set_header Upgrade $http_upgrade;
                            proxy_set_header Connection 'upgrade';
                            proxy_set_header Host $host;
                            proxy_cache_bypass $http_upgrade;
                        }

                        location /backend_2/ {
                            proxy_pass http://localhost:3001;
                            proxy_http_version 1.1;
                            proxy_set_header Upgrade $http_upgrade;
                            proxy_set_header Connection 'upgrade';
                            proxy_set_header Host $host;
                            proxy_cache_bypass $http_upgrade;
                        }
                    }

                *NOTA:* Al ingresar a ejemplo.com/backend_1, se accedera al servicio de NodeJS que este corriendo en el puerto 3000. ejemplo.com/backend_2 redirecciona al puerto 3001.
                
                **_Importante: No es necesario permitir en el firewall los puertos 3000 y 3001, dado que la redireccion es interna, desde la red publica solo se ingresa al servidor Nginx por el puerto 80 o 443, los cuales ya fueron permitidos en la instalacion._**

            *   Finalizar configuracion
                
                Corroborar que no haya errores en los archivos modificados
                
                    sudo nginx -t

                Si no se encontraron problemas, reiniciar el servicio para aceptar los cambios

                    sudo systemctl restart nginx

                *NOTA:* en caso de que no funcione la redireccion, ejecutar la siguiente linea

                    sudo ln -s /etc/nginx/sites-available/ejemplo.com /etc/nginx/sites-enabled/

            *Fuente:* https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04#set-up-reverse-proxy-server


        *   ### Configurar Let's Encrypt con Certbot

            *   Instalar Certbot

                    sudo add-apt-repository ppa:certbot/certbot
                    sudo apt update
                    sudo apt install python-certbot-nginx

            *   Verificar que se haya generado correctamente el archivo de "Server Blocks" realizado en la configuracion de Reverse Proxy

                    sudo nano /etc/nginx/sites-available/ejemplo.com

                Deberia existir la linea
                
                    ...
                    server_name example.com
                    ...

            *   Verificar archivo de bloque valido

                    sudo nginx -t

            *   Reiniciar el servicio

                    sudo systemctl reload nginx

            *   Verificar que los puertos esten abiertos en el firewall (Nginx Full)

                    sudo ufw status

                    // output
                        Status: active
                        To                         Action      From
                        --                         ------      ----
                        OpenSSH                    ALLOW       Anywhere                
                        Nginx Full                 ALLOW       Anywhere                
                        OpenSSH (v6)               ALLOW       Anywhere (v6)         
                        Nginx Full (v6)            ALLOW       Anywhere (v6)

                En caso de que los puertos esten habilitados solo para Nginx HTTP o HTTPS, eliminar la regla y crear correspondiente
                    
                    // eliminar la regla incorrecta
                    sudo ufw delete allow 'Nginx HTTP'
                        // ó
                    sudo ufw delete allow 'Nginx HTTPS'

                    // agregar la regla correspondiente
                    sudo ufw allow 'Nginx Full'
       
            *   Obtener certificado SSL

                    sudo certbot --nginx -d ejemplo.com

                En caso de éxito, certbot te preguntará cómo configurar los ajustes para HTTPS:

                    // output
                        Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
                        -------------------------------------------------------------------------------
                        1: No redirect - Make no further changes to the webserver configuration.
                        2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
                        new sites, or if you're confident your site works on HTTPS. You can undo this
                        change by editing your web server's configuration.
                        -------------------------------------------------------------------------------
                        Select the appropriate number [1-2] then [enter] (press 'c' to cancel):

                Seleccionar la opcion 2 (Redireccionar de HTTP a HTTPS)

            *   Verificar renovación automatica de Certbot

                    sudo certbot renew --dry-run

                No deberia mostrar errores.

            *Fuente:* https://www.digitalocean.com/community/tutorials/como-asegurar-nginx-con-let-s-encrypt-en-ubuntu-18-04-es









        

        
        

            


        
