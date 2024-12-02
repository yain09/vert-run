(assets/images/redmeImg.webp)

# Strava Tracker

Strava Tracker es una aplicación móvil desarrollada con **React Native** y **Expo**. Permite a los usuarios autenticarse mediante OAuth para conectarse con la API de Strava, ver sus actividades recientes y consultar estadísticas mensuales agregadas. Este proyecto utiliza herramientas modernas como **Zustand** para la gestión de estado y **React Query** para la obtención y caché de datos.

## Características

- **Autenticación OAuth**: Los usuarios pueden iniciar sesión con su cuenta de Strava de manera segura.
- **Deep Linking**: Implementación de enlaces profundos para manejar el redireccionamiento durante el proceso de autenticación.
- **Pantalla de Actividades**:
  - Ver una lista de actividades recientes sincronizadas desde Strava.
  - Información detallada de cada actividad, como nombre, fecha, distancia, tiempo y elevación ganada.
- **Pantalla de Estadísticas Mensuales**:
  - Resumen de datos agregados (distancia total, tiempo total, ganancia de elevación) de los últimos tres meses.
  - Navegación hacia actividades específicas de un mes.
- **Gestión y optimización de datos**:
  - **React Query** para la obtención eficiente de datos y su almacenamiento en caché.
  - **Zustand** para la administración de estado global.

## Tecnologías Utilizadas

- **Expo**: Framework para desarrollo de aplicaciones móviles.
- **React Native**: Base del desarrollo móvil.
- **Zustand**: Biblioteca ligera para gestión de estado.
- **React Query**: Herramienta para la sincronización de datos con el backend.
- **Strava API**: Para obtener datos de actividades y estadísticas de usuarios.

## Instalación y Ejecución

1. Clonar este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/strava-tracker.git
   cd strava-tracker
   ```
