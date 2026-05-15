# 📱 Pokédex App

Una aplicación móvil interactiva para explorar el universo Pokémon, construida con React Native y Expo. Este proyecto consume la [PokeAPI](https://pokeapi.co/) para mostrar información detallada, estadísticas y características de cientos de Pokémon.

## 📸 Capturas de Pantalla

A continuación se muestra el funcionamiento principal de la aplicación:

### 1. Pantalla Principal (Lista y Búsqueda)
<img width="720" height="1600" alt="WhatsApp Image 2026-05-15 at 1 09 18 AM" src="https://github.com/user-attachments/assets/7e136956-587c-473e-bd11-ed6959cb9f66" />
> **Contexto:** La vist
a principal muestra una cuadrícula con scroll infinito de todos los Pokémon disponibles. Incluye una barra de búsqueda optimizada (con *debounce*) que permite filtrar instantáneamente por el nombre del Pokémon o su número de Pokédex.

### 2. Pantalla de Detalle (Estadísticas)
![Detalle de Pokémon](./assets/screenshots/detail.jpg)
> **Contexto:** Al tocar cualquier tarjeta, el usuario navega a la vista de detalle. Aquí se presentan los *sprites* oficiales, los tipos elementales (ej. Grass, Poison), el peso y las estadísticas base de combate (HP, Attack, Defense, etc.) extraídas en tiempo real de la PokeAPI.

### 3. Pantalla "Acerca de" (About)
![Acerca de la App](./assets/screenshots/about.jpg)
> **Contexto:** Una pantalla informativa accesible desde la barra de navegación inferior (Tabs). Explica el propósito educativo de la aplicación, el origen de los datos (PokeAPI) y las tecnologías clave utilizadas en el desarrollo.

---

## 🚀 Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando el siguiente stack tecnológico:

- **Framework Core:** [React Native](https://reactnative.dev/) (v0.81)
- **Entorno de Desarrollo:** [Expo](https://expo.dev/) (SDK 54)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para tipado estricto y seguro.
- **Navegación:** `expo-router` para enrutamiento basado en archivos (File-based routing).
- **Estilos:** `nativewind` y `tailwindcss` para el diseño visual mediante clases de utilidad.
- **Consumo de API:** `fetch` nativo consumiendo endpoints REST de PokeAPI.

---

## 🛠️ Cómo arrancar el proyecto localmente

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

### Requisitos previos
- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- Un emulador (Android Studio / Xcode) o la app **Expo Go** instalada en tu dispositivo físico.

### Pasos de instalación

1. **Clona el repositorio:**
   ```bash
   git clone [repoUrl]
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo (Metro Bundler):**
   ```bash
   npm start
   ```

4. **Visualiza la aplicación:**
   - Presiona **`a`** en la terminal para abrir en el emulador de Android.
   - Presiona **`i`** para abrir en el simulador de iOS (solo Mac).
   - Escanea el código QR que aparece en la terminal con la app **Expo Go** desde tu celular.

---

## 🌿 Flujo de Trabajo (GitFlow)
Este repositorio sigue la metodología **GitFlow** para el control de versiones:
- `main`: Contiene el código de producción estable.
- `develop`: Rama principal de integración para nuevas características.
- Ramas `feature/*`: Utilizadas para desarrollar nuevas funcionalidades (ej. `feature/issue-3-debounce`).
- Ramas `bugfix/*`: Utilizadas para arreglar errores reportados en el Project Board.
