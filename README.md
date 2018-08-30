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
<!-- 
* ## Maquina fisica Proxmox:

    1.  ### Administracion WEB: https://dominio:8006

    2.  ### Instalar certificado Let’s Encrypt - ACME
        ![Alt text](./assets/certificadoProxmox.png)
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
            service systemd-logind restart -->

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

        ### Editar el archivo 
        **sudo nano /etc/ssh/sshd_config** y agregar las siguientes lineas segun necesidad

            // denegar ingreso solo root (recomendado)
            PermitRootLogin no

            // denegar ingreso a usuarios especificos (separados con espacio)
            DenyUsers usuario1 usuario2

            // permitir ingreso a usuarios especificos (separados con espacio)
            AllowUsers usuario1 usuario2

        ### Guardar el archivo y resetar el servicio SSH

            sudo service ssh restart

        *Fuente:* https://www.ostechnix.com/allow-deny-ssh-access-particular-user-group-linux/

    3.  ### **Instalar Nginx**
    


        

        
        

            


        
