# Miles Visual - Frontend 📸

Este es el frontend de la plataforma **Miles Visual**, una solución integral para la gestión de servicios de fotografía, portafolio multimedia y administración de clientes (CRM).

## 🚀 Tecnologías Principales

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Estado Global**: [Zustand](https://github.com/pmndrs/zustand)
- **Caché Local**: [Dexie.js](https://dexie.org/) (IndexedDB para persistencia ultra-rápida)
- **Estilos**: Tailwind CSS con una estética premium y minimalista.
- **Iconografía**: Lucide React.
- **Autenticación**: NextAuth.js.

## ✨ Características Clave

- **Dashboard Administrativo**: Gestión completa de planes, portafolio, reservas y solicitudes de presupuesto.
- **Sincronización Atómica**: Sistema robusto de sincronización con el backend que utiliza cache-busting e invalidación inteligente.
- **Portafolio Multimedia**: Galería dinámica con soporte para imágenes y videos optimizados.
- **Experiencia de Usuario Premium**: Diseño responsivo con micro-animaciones, modo oscuro/claro coherente y estados de carga optimizados.

## 🛠️ Configuración del Proyecto

### Variables de Entorno

Crea un archivo `.env.local` en la raíz con las siguientes variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
NEXTAUTH_SECRET=tu_secreto_aqui
NEXTAUTH_URL=http://localhost:3000

# Opcional: Integraciones de Terceros
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

### Instalación y Ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Estructura de Carpetas

- `/app`: Rutas de la aplicación (Admin y Públicas).
- `/components`: Componentes reutilizables de UI.
- `/store`: Lógica de Zustand para la gestión de estado y sincronización.
- `/lib`: Configuraciones de base de datos local (Dexie) y utilidades.
- `/public`: Assets estáticos.

## 📄 Licencia

Este proyecto es privado y propiedad de Miles Visual.
