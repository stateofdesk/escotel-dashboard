# Escotel Dashboard - Documentación del Proyecto

## 📋 Información General

**Nombre**: Escotel TV Dashboard  
**Versión**: 0.0.0  
**Tipo**: Dashboard en tiempo real para televisores  
**Puerto**: 5173 (Vite development)  
**Tecnología**: React 19.1.0 + Vite 6.3.5 + Bootstrap + Chart.js

## 🏗️ Arquitectura del Proyecto

### Stack Tecnológico
- **Frontend**: React 19.1.0 con hooks modernos
- **Router**: React Router DOM 7.8.2
- **Charts**: Chart.js 4.5.0 + React-Chartjs-2 5.3.0
- **Build**: Vite 6.3.5 con hot reload
- **Styling**: Bootstrap + CSS personalizado
- **Linting**: ESLint 9.25.0

### Estructura de Directorios
```
escotel-bootstrap/
├── src/
│   ├── components/     # Componentes de gráficos
│   ├── services/       # API service (Singleton)
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Páginas de la aplicación
│   └── assets/         # Recursos estáticos
├── public/             # Assets públicos + Bootstrap
├── context/            # Documentación técnica
└── .mcp.json          # Configuración MCP servers
```

## 🎯 Propósito y Funcionalidad

### Objetivo Principal
Dashboard de televisión fullscreen que muestra métricas de servicios Escotel en tiempo real con auto-refresh cada 5 minutos.

### Características Clave
- **Vista TV**: 100vh sin navegación, diseño 2x3 grid
- **Datos Reales**: Integración con API Escotel via POST
- **Auto-refresh**: Actualización automática cada 5 minutos
- **Responsivo**: Bootstrap grid system adaptativo
- **Zoom Handling**: Re-render inteligente en zoom del navegador

## 📊 Dashboard Layout

### Grid Responsivo (6 Gráficos)
```css
Desktop/TV:  col-lg-4  (3 columnas, 33.33% c/u)
Tablet:      col-md-6  (2 columnas, 50% c/u)  
Mobile:      col-12    (1 columna, 100%)
```

### Componentes de Gráficos

#### 🔴 Datos Reales (API Escotel)
1. **ServiciosChart** - `/Servicios` endpoint
   - Costos y asistencias diarias (últimos 10 días)
   - Colores: Rosa/Rojo

2. **DatosGeneralesChart** - `/DatosGenerales` endpoint  
   - Servicios locales vs carreteros + costos
   - Colores: Púrpura/Turquesa/Dorado

#### 🟡 Datos Mock (Estáticos)
3. **AsistenciasChart** - Verde (#28a745)
4. **TiempoAsignacionChart** - Azul (#007bff)
5. **TiempoArriboChart** - Naranja (#fd7e14)
6. **CanceladosChart** - Rojo (#dc3545)

## 🌐 Integración API

### Base URL
```
https://dev-sigsa.backend.escotel.mx/api/EstadisticasServicios
```

### Endpoints
- `POST /Servicios` - Datos de servicios con fechas
- `POST /DatosGenerales` - Estadísticas generales

### Request Format
```javascript
{
  "fechaInicio": "2024-01-15"  // YYYY-MM-DD o null (usa ayer)
}
```

### Response Processing
- **Filtrado**: Últimos 10 días máximo
- **Ordenamiento**: Ascendente por fecha
- **Formato**: Fechas localizadas "15 ene", "16 ene"
- **Validación**: Valores null/undefined → 0

## ⚡ Características Técnicas

### Auto-refresh System
```javascript
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 300000); // 5 min
  return () => clearInterval(interval);
}, []);
```

### Zoom Handling Hook
```javascript
// useZoomResize detecta Ctrl+Wheel y fuerza re-render
const handleWheel = (e) => {
  if (e.ctrlKey) {
    setTimeout(() => setZoomKey(prev => prev + 1), 300);
  }
};
```

### Estados de Carga
- **Loading**: Spinner + mensaje "Cargando datos..."
- **Error**: Icono WiFi + mensaje error + retry
- **Success**: Gráficos renderizados

## 📐 Especificaciones Visuales

### Dimensiones
- **Container**: `height: 100vh` + `padding: 15px`
- **Cada Gráfico**: `height: 48vh` + `margin-bottom: 15px`
- **Charts Internos**: `height: 380px` + `width: 100%`

### Diseño Cards
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.15)
border-radius: 16px
background-color: #f8f9fa (header)
border-bottom: 1px solid #dee2e6
```

## 🔧 Configuración de Desarrollo

### Scripts NPM
```bash
npm run dev      # Vite desarrollo (puerto 5173)
npm run build    # Build producción
npm run lint     # ESLint check
npm run preview  # Preview build
```

### MCP Servers
```json
{
  "browsermcp": "npx @browsermcp/mcp@latest",
  "filesystem": "cmd.exe /c npx @modelcontextprotocol/server-filesystem"
}
```

## 📊 Métricas Calculadas

### API Service Singleton
- **fetchServicios()** - Obtiene datos de servicios
- **fetchDatosGenerales()** - Obtiene datos generales  
- **calculateMetrics()** - Calcula promedios y totales
- **processData()** - Formatea datos para Chart.js

### Métricas Disponibles
- Total costos, asistencias, servicios
- Promedios de asignación, arribo, conclusión (minutos)
- Porcentajes local vs carretero
- Min/Max valores por período

## 🎨 Paleta de Colores

```css
/* API Reales */
Servicios:       rgba(255, 99, 132, *)  /* Rosa/Rojo */
Datos Generales: rgba(153, 102, 255, *) /* Púrpura */

/* Mock Charts */
Asistencias:     #28a745  /* Verde Bootstrap */
T.Asignación:    #007bff  /* Azul Bootstrap */
T.Arribo:        #fd7e14  /* Naranja */
Cancelados:      #dc3545  /* Rojo Bootstrap */
```

## 🚀 Estado del Proyecto

### ✅ Implementado
- Dashboard TV fullscreen funcional
- Integración API real (2/6 gráficos)
- Auto-refresh cada 5 minutos
- Grid responsivo Bootstrap
- Zoom handling inteligente
- Estados de carga y error
- MCP servers configurados

### 🔄 En Desarrollo
- Charts mock con datos estáticos
- Métricas adicionales
- Optimizaciones de performance

### 📋 Próximos Pasos
- Conectar 4 charts restantes a API real
- Implementar más endpoints de métricas
- Optimizaciones UI/UX
- Tests automatizados