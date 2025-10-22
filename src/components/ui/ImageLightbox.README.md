# ImageLightbox Component

Componente de galería de imágenes con visor ampliado (lightbox) para mostrar imágenes en pantalla completa.

## Características ✨

### 🖼️ Visualización
- **Pantalla completa** con fondo oscuro (overlay)
- **Imágenes optimizadas** con transiciones suaves
- **Modo zoom** para ver detalles (click en la imagen)
- **Pie de foto** con descripción (alt text)

### 🎮 Controles
- **Navegación con flechas** (izquierda/derecha)
- **Teclado**: 
  - `←` / `→` - Navegar entre imágenes
  - `Esc` - Cerrar el lightbox
- **Contador de imágenes** (ej: "2 / 5")
- **Miniaturas de navegación** (para galerías de 2-10 imágenes)

### 📱 Mobile-friendly
- **Touch-friendly** con botones grandes
- **Hint de deslizamiento** en móviles
- **Responsive** - se adapta a cualquier tamaño de pantalla
- **Prevención de scroll** cuando está abierto

### 🎨 UX/UI
- **Animaciones suaves** con Framer Motion
- **Backdrop blur** en los controles
- **Feedback visual** en todos los botones
- **Accesibilidad** con aria-labels

## Uso

```tsx
import ImageLightbox from '@/components/ui/ImageLightbox';

function MyGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [
    { url: '/photo1.jpg', alt: 'Descripción 1' },
    { url: '/photo2.jpg', alt: 'Descripción 2' },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Ver galería
      </button>

      <ImageLightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={() => setCurrentIndex((i) => (i + 1) % images.length)}
        onPrevious={() => setCurrentIndex((i) => (i - 1 + images.length) % images.length)}
      />
    </>
  );
}
```

## Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `images` | `Image[]` | Array de imágenes con `url`, `alt`, `width?`, `height?` |
| `currentIndex` | `number` | Índice de la imagen actual (0-based) |
| `isOpen` | `boolean` | Controla si el lightbox está visible |
| `onClose` | `() => void` | Callback al cerrar el lightbox |
| `onNext` | `() => void` | Callback para ir a la siguiente imagen |
| `onPrevious` | `() => void` | Callback para ir a la imagen anterior |

## Integración con AccommodationCard

El lightbox está integrado automáticamente en las tarjetas de alojamiento:

- **Click en la imagen** - Abre el visor
- **Icono de maximizar** - Aparece al hacer hover
- **Hint visual** - "Click para ampliar" en hover

## Personalización

### Colores
Edita las clases Tailwind en el componente:
- `bg-black/95` - Fondo del overlay
- `bg-white/10` - Controles con transparencia
- `hover:bg-white/20` - Hover de controles

### Animaciones
Ajusta las transiciones en los objetos `motion`:
```tsx
transition={{ duration: 0.3 }}
```

### Miniaturas
Las miniaturas solo aparecen si hay entre 2 y 10 imágenes. Para cambiar:
```tsx
{images.length > 1 && images.length <= 10 && (
  // código de miniaturas
)}
```

## Próximas mejoras

- [ ] Soporte para swipe/gestos táctiles
- [ ] Precarga de imágenes adyacentes
- [ ] Soporte para videos
- [ ] Galería en grid (alternativa al carousel)
- [ ] Compartir imagen en redes sociales
- [ ] Descargar imagen
