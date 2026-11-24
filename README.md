# Web_Parcial_2
Parte práctica del parcial 2 de Programación con Tecnologías Web.

API REST en NestJS y Mongoose para la gestión de **Usuarios (`/users`)** y **Tareas (`/tasks`)**.

---

## Requisitos Previos

- Node.js 22 y npm
- Docker Compose o MongoDB local en el puerto `27017`

---

## Instalación y Puesta en Marcha

1. **Levantar la base de datos MongoDB:**
   ```bash
   docker compose up -d
   ```
   Si usas otro servidor, define `MONGODB_URI` en la terminal antes de iniciar la API.

2. **Instalar dependencias del proyecto:**
   ```bash
   npm ci
   ```

3. **Iniciar la aplicación en modo desarrollo:**
   ```bash
   npm run start:dev
   ```
   El servidor quedará disponible en `http://localhost:3000`.

## Cambios del supletorio

1. Agregué `CreateTaskDto` y `ValidationPipe` para rechazar campos extra. También dejé el esquema de tareas en modo estricto.
2. Exporté `UsersService` y lo usé desde Tareas para verificar si el usuario existe.
3. Usé `ParseIntPipe` para validar la prioridad que llega en la URL.
4. Quité el arreglo en memoria. El listado ahora consulta MongoDB mediante `TasksService`.

## Evidencia de funcionamiento

Probé con Node.js 22 y MongoDB 6 en Docker. Creé un usuario con `POST /users` y usé su `_id` como `userId` para crear dos tareas con prioridades 1 y 2.

| Caso | Qué probé | Resultado |
| --- | --- | --- |
| 1 | `POST /tasks` con una tarea válida y luego con `campoExtra`. | `201` para la válida y `400` para la segunda. Entre las dos peticiones se guardó una sola tarea. |
| 2 | `POST /tasks` con un usuario existente y con un ID de usuario inexistente. | `201` con el usuario existente y `404` con el otro. La tarea rechazada no se guardó. |
| 3 | `GET /tasks/priority/2`, `/tasks/priority/urgente` y `/tasks/priority/2.5`. | `200` y solo la tarea de prioridad 2. Las otras dos peticiones devolvieron `400`. |
| 4 | `GET /tasks` antes y después de reiniciar la API y desde otra instancia. | Las dos tareas aparecieron con los mismos IDs. Ambas se pudieron consultar por ID con `200`. |

También pasaron `npm run build` y `npm test -- --runInBand`.
