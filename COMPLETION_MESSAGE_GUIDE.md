# CompletionMessage - Componente Unificado de Mensajes de Completado

## Descripción

Componente reutilizable que muestra un mensaje de completado correctamente para cualquier modalidad de ejercicio. Centraliza los estilos y comportamientos de feedback positivo.

## Ubicación

`components/ui/CompletionMessage.tsx`

## Propiedades

| Propiedad  | Tipo             | Default     | Descripción                                                                |
| ---------- | ---------------- | ----------- | -------------------------------------------------------------------------- |
| `visible`  | `boolean`        | -           | Controla la visibilidad del mensaje                                        |
| `type`     | `CompletionType` | `"success"` | Tipo de mensaje: `"success"` \| `"perfect"` \| `"excellent"` \| `"custom"` |
| `message`  | `string`         | -           | Mensaje personalizado (solo se usa cuando `type="custom"`)                 |
| `showIcon` | `boolean`        | `true`      | Muestra un icono junto al mensaje                                          |
| `duration` | `number`         | `1500`      | Duración de la animación en milisegundos                                   |
| `onHide`   | `() => void`     | -           | Callback ejecutado cuando el mensaje desaparece                            |

## Tipos de Mensaje

- **`success`**: Muestra "¡Correcto!" con icono de checkmark
- **`perfect`**: Muestra "¡Perfecto!" con icono de checkmark-circle
- **`excellent`**: Muestra "¡Excelente!" con icono de star
- **`custom`**: Muestra el mensaje personalizado pasado en la prop `message`

## Ejemplos de Uso

### En ListeningExercise

```tsx
const [showCompletion, setShowCompletion] = useState(false);

const checkAnswer = () => {
  if (selectedWords.join(" ") === config.correctSentence) {
    setShowCompletion(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  } else {
    alert("Inténtalo de nuevo");
  }
};

return (
  <View>
    {/* ... componente ... */}
    <CompletionMessage
      visible={showCompletion}
      type="success"
      duration={1200}
      onHide={() => setShowCompletion(false)}
    />
  </View>
);
```

### En PronunciationGame

```tsx
const [showCompletion, setShowCompletion] = useState(false);

const checkPronunciation = (transcript: string) => {
  // ... validación ...
  if (isCorrect) {
    setShowSuccess(true);
    setShowCompletion(true);
    Speech.speak("Great job!", { language: "en-US" });
    setTimeout(() => onComplete(), 1500);
  }
};

return (
  <View>
    {/* ... componente ... */}
    <CompletionMessage
      visible={showCompletion}
      type="perfect"
      duration={1200}
      onHide={() => setShowCompletion(false)}
    />
  </View>
);
```

### Uso Personalizado

```tsx
<CompletionMessage
  visible={isCorrect}
  type="custom"
  message="¡Respuesta increíble!"
  duration={2000}
  onHide={() => setIsCorrect(false)}
/>
```

### Sin Icono

```tsx
<CompletionMessage
  visible={showMessage}
  type="excellent"
  showIcon={false}
  duration={1500}
  onHide={() => setShowMessage(false)}
/>
```

## Características

- ✅ Animación suave de entrada y salida
- ✅ Fondo oscuro semi-transparente para enfoque
- ✅ Múltiples estilos predefinidos
- ✅ Personalizable con mensajes custom
- ✅ Callback opcional al desaparecer
- ✅ Duración configurable
- ✅ Iconos con Ionicons

## Integración en Otros Componentes

Para usar este componente en otras modalidades de ejercicios:

1. **Importar el componente:**

   ```tsx
   import { CompletionMessage } from "@/components/ui/CompletionMessage";
   ```

2. **Agregar estado:**

   ```tsx
   const [showCompletion, setShowCompletion] = useState(false);
   ```

3. **Mostrar el mensaje al validar respuesta correcta:**

   ```tsx
   if (isCorrect) {
     setShowCompletion(true);
     setTimeout(() => onComplete(), 1500);
   }
   ```

4. **Renderizar el componente en el JSX:**
   ```tsx
   <CompletionMessage
     visible={showCompletion}
     type="success"
     duration={1200}
     onHide={() => setShowCompletion(false)}
   />
   ```

## Componentes Actualizados

- ✅ `ListeningExercise.tsx` - Usa tipo `"success"`
- ✅ `PronunciationGame.tsx` - Usa tipo `"perfect"`

## Próximas Integraciones

Puedes integrar este componente en:

- `MemoryGame.tsx`
- `MatchingExercise.tsx`
- `ImageSelectionExercise.tsx`
- `DragAndDropExercise.tsx`
- `ConjugationExercise.tsx`
- `SentenceBuilder.tsx`
- Otros ejercicios según sea necesario
