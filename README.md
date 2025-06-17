# Sistema de Gestión Hotelera "Hotelituss"

Este documento contiene toda la información necesaria para clonar, configurar y ejecutar el sistema completo de "Hotelituss", incluyendo tanto el **Front-End** (interfaz de usuario) como el **Back-End** (servidor y lógica de negocio).

---

### Tabla de Contenidos
1.  [Descripción del Proyecto](#descripción-del-proyecto)
2.  [Arquitectura y Tecnologías](#arquitectura-y-tecnologías)
3.  [Requisitos Previos](#requisitos-previos)
4.  [Guía de Instalación y Ejecución](#guía-de-instalación-y-ejecución)
5.  [Autores](#autores)

---

### Descripción del Proyecto
"Hotelituss" es una aplicación web diseñada para la administración y reserva de habitaciones de hotel. El sistema se compone de una interfaz de cliente (Front-End) para la interacción del usuario y un servicio de servidor (Back-End) que gestiona los datos y la lógica.

* **Front-End:** Permite a los usuarios visualizar información del hotel, ver habitaciones disponibles y realizar el proceso de reserva.
* **Back-End:** Procesa las solicitudes del cliente, gestiona la disponibilidad y almacena la información de las reservas.

---

### Arquitectura y Tecnologías
El proyecto está dividido en dos repositorios independientes que trabajan en conjunto.

#### **Tecnologías del Front-End**
* **HTML5**
* **CSS3**
* **JavaScript**

#### **Tecnologías del Back-End**
* **JavaScript (Node.js)**
* **HTML5 / CSS3** (para servir posibles páginas o plantillas)

---

### Requisitos Previos
Para poder ejecutar el sistema completo en un entorno de desarrollo local, necesitarás tener instalado el siguiente software:

* [**Git**](https://git-scm.com/): Para clonar los repositorios.
* [**Node.js**](https://nodejs.org/) (versión 18 o superior recomendada): Para ejecutar el servidor del Back-End e instalar sus dependencias.
* Un **Navegador Web** moderno (ej. Google Chrome, Mozilla Firefox).

---

### Guía de Instalación y Ejecución
Sigue estos pasos en orden para levantar el sistema completo. Se recomienda usar dos ventanas de terminal separadas, una para el Front-End y otra para el Back-End.

#### **Paso 1: Preparar el Espacio de Trabajo**
Crea una carpeta principal para contener ambos proyectos.
```bash
mkdir Hotelituss-Project
cd Hotelituss-Project


Paso 2: Configurar el Back-End
Clonar el repositorio del Back-End:
Bash

git clone [https://github.com/Stefaneush/Despliegue-de-Pagina.git](https://github.com/Stefaneush/Despliegue-de-Pagina.git)
Navegar a la carpeta del Back-End:
Bash

cd Despliegue-de-Pagina
Instalar dependencias (si aplica): Si tu proyecto tiene un archivo package.json, ejecuta este comando. De lo contrario, puedes omitir este paso.
Bash

npm install
Ejecutar el servidor del Back-End: Revisa tu archivo package.json o tu archivo principal (ej. server.js, index.js) para el comando correcto.
Bash

npm start
# O podrías necesitar ejecutar: node index.js
Una vez ejecutado, el servidor estará escuchando peticiones. ¡No cierres esta terminal!
Paso 3: Configurar el Front-End
Abre una nueva terminal y vuelve a la carpeta principal Hotelituss-Project.

Clonar el repositorio del Front-End:
Bash

git clone [https://github.com/mauroas7/hotelituss.git](https://github.com/mauroas7/hotelituss.git)
Navegar a la carpeta del Front-End:
Bash

cd hotelituss
Ejecutar la aplicación: Simplemente abre el archivo index.html en tu navegador web. La interfaz de usuario debería cargarse y ser capaz de comunicarse con el Back-End que dejaste corriendo en la otra terminal.
¡Listo! Con estos pasos, el sistema completo debería estar funcionando en tu máquina local.
