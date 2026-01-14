# Solución: Múltiples Métodos de Autenticación en Firebase

## Problema

Un usuario se registraba con Google, pero al intentar iniciar sesión con email/contraseña, recibía error "usuario no encontrado" o "credenciales inválidas". Esto ocurre porque Firebase mantiene los métodos de autenticación por separado.

## Causa Raíz

- Cuando un usuario se registra con Google, Firebase crea un usuario en Authentication pero **no crea email/contraseña**
- Al intentar loguearse con email/contraseña después, Firebase no encuentra ese usuario porque esas credenciales específicas no existen
- Es un comportamiento esperado de Firebase, no un bug

## Solución Implementada

### 1. **Detección de Métodos de Autenticación Existentes**

Se agregó la función `fetchSignInMethodsForEmail()` de Firebase que permite verificar si un email ya está registrado con otros métodos.

```typescript
const signInMethods = await fetchSignInMethodsForEmail(auth, email);
```

### 2. **Mejoras en el Flujo de Registro**

Cuando el usuario intenta registrarse con email/contraseña:

- Verificamos si ese email ya existe en **cualquier** método de autenticación
- Si existe, mostramos un mensaje indicando cuál método debe usar (ej: "google.com", "password")

```typescript
if (isRegistering) {
  const signInMethods = await fetchSignInMethodsForEmail(auth, email);

  if (signInMethods.length > 0) {
    setErrorMessage(
      `Este correo ya está registrado. Utiliza el método: ${signInMethods.join(
        ", "
      )}`
    );
    return;
  }
  // Proceder con el registro...
}
```

### 3. **Mejoras en el Flujo de Login**

Cuando el usuario intenta loguearse con email/contraseña:

- Si el login falla con "usuario no encontrado", verificamos si el email existe con otro método
- Si existe, mostramos un mensaje claro indicando cuál método usar

```typescript
try {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  await handleAuthSuccess(userCredential);
} catch (error: any) {
  if (
    error.code === "auth/user-not-found" ||
    error.code === "auth/invalid-credential"
  ) {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods.length > 0) {
      setErrorMessage(
        `Este correo está registrado con: ${signInMethods.join(
          ", "
        )}. Por favor, usa ese método para iniciar sesión.`
      );
    } else {
      setErrorMessage("Credenciales incorrectas...");
    }
  }
}
```

## Cambios en el Archivo

### Imports Agregados:

```typescript
import { fetchSignInMethodsForEmail, linkWithCredential } from "firebase/auth";

import { Modal, Alert } from "react-native";
```

### Estado Agregado:

```typescript
const [showLinkingOptions, setShowLinkingOptions] = useState(false);
const [linkedGoogleCredential, setLinkedGoogleCredential] = useState<any>(null);
```

### Función Mejorada:

- `handleEmailAuth()` - Ahora detecta métodos de autenticación existentes

## Opciones Futuras Avanzadas

### Opción A: Enlazar Múltiples Métodos (Advanced)

Permitir que un usuario que se registró con Google agregue email/contraseña a su cuenta:

```typescript
// Después de autenticarse con Google
const googleCredential = GoogleAuthProvider.credential(id_token);
const result = await signInWithCredential(auth, googleCredential);

// Luego el usuario puede agregar email/contraseña
const credential = EmailAuthProvider.credential(email, password);
await linkWithCredential(result.user, credential);
```

### Opción B: Consolidación de Cuentas

Si el usuario intenta usar un email con métodos diferentes, ofrecer consolidar la cuenta.

### Opción C: Agregar Social Login Adicionales

Implementar otros proveedores (Apple, Facebook) con la misma lógica.

## Mensaje de Error Mejorado para el Usuario

Ahora el usuario verá mensajes claros como:

- ❌ "Este correo está registrado con: google.com. Por favor, usa Google para iniciar sesión."
- ❌ "Este correo ya está registrado. Utiliza el método: password"

## Testing Recomendado

1. **Caso 1**: Registrarse con Google → Intentar login con email/contraseña

   - Resultado esperado: Mensaje indicando usar Google

2. **Caso 2**: Registrarse con email/contraseña → Intentar login con Google

   - Resultado esperado: Se crea nueva cuenta con Google (o se rechaza si emails coinciden)

3. **Caso 3**: Usar email correcto con método correcto
   - Resultado esperado: Login exitoso

## Notas de Seguridad

- `fetchSignInMethodsForEmail()` es seguro y no expone información sensible
- No filtra entre métodos de autenticación activos/inactivos
- Es la forma recomendada por Firebase para este caso de uso
