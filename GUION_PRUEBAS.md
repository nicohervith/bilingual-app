# 🧪 GUIÓN DE PRUEBAS - Múltiples Métodos de Autenticación

## Antes de Empezar

- ✅ Asegúrate de tener la app actualizada con los cambios
- ✅ Abre la app en el emulador o dispositivo real
- ✅ Ten acceso a una cuenta Google para pruebas
- ⏱️ Tiempo estimado: 15-20 minutos

---

## TEST 1: Registrarse con Google → Intentar Email/Password

### Propósito

Reproducir el problema original del cliente

### Pasos

1. **Abrir la app**

   - [ ] La app está funcionando
   - [ ] Estás en la pantalla de login

2. **Registrarse con Google**

   - [ ] Haz clic en botón "Google"
   - [ ] Aparece ventana de Google
   - [ ] Selecciona una cuenta Google de prueba
   - [ ] Autoriza la app
   - [ ] Se cierra la ventana de Google
   - [ ] **Resultado**: Se redirige al dashboard

3. **Cerrar sesión**

   - [ ] Busca el botón de cerrar sesión en dashboard
   - [ ] Haz clic
   - [ ] Vuelves a pantalla de login

4. **Intentar login con email/password**

   - [ ] Campo Email: `[el email asociado a tu cuenta Google]`
   - [ ] Campo Contraseña: `cualquiercontraseña`
   - [ ] Haz clic en "Entrar"
   - [ ] Espera 2 segundos

5. **Verificar Resultado** ✅

   - [ ] Aparece mensaje de error
   - [ ] **Debe decir**: "Este correo está registrado con: google.com"
   - [ ] El mensaje sugiere usar Google
   - [ ] ❌ NO debe decir: "Credenciales incorrectas" (sin más detalles)

6. **Confirmar que Google funciona**
   - [ ] Haz clic en botón "Google"
   - [ ] Aparece ventana de Google
   - [ ] Selecciona la MISMA cuenta Google
   - [ ] Autoriza
   - [ ] **Resultado**: Se redirige al dashboard ✅

### Resultado Esperado

```
✅ PASSOU
- Mensaje claro indicando uso de Google
- Google login funciona normalmente
```

---

## TEST 2: Registrarse con Email/Password → Intentar Usar Email Existente en Google

### Propósito

Verificar que no permite duplicar emails

### Pasos

1. **Cerrar sesión si estás logueado**

   - [ ] Ve al dashboard (si estás logueado)
   - [ ] Busca y haz clic en "Cerrar sesión"
   - [ ] Vuelves a pantalla de login

2. **Cambiar a "Registrarse"**

   - [ ] En pantalla de login, haz clic en "¿No tienes cuenta? Regístrate"
   - [ ] El botón principal ahora dice "Registrarse"
   - [ ] El título dice "Crear Cuenta"

3. **Intentar registrarse con email de Google**

   - [ ] Campo Email: `[el email que usaste antes en Google]`
   - [ ] Campo Contraseña: `TestContraseña123`
   - [ ] Haz clic en "Registrarse"
   - [ ] Espera 2 segundos

4. **Verificar Resultado** ✅

   - [ ] Aparece banner de error
   - [ ] **Debe decir**: "Este correo ya está registrado. Utiliza el método: google.com"
   - [ ] El email no se registra
   - [ ] Vuelves a estar en pantalla de registro

5. **Verificar que NO se creó cuenta**
   - [ ] Limpia los campos
   - [ ] Cambia a "Entrar" (login)
   - [ ] Intenta login con email + contraseña que intentaste
   - [ ] Debe fallar (la contraseña no fue creada)

### Resultado Esperado

```
✅ PASSOU
- No permite duplicar email
- Mensaje claro sobre método existente
```

---

## TEST 3: Registrarse con Email/Password → Login Normal

### Propósito

Verificar que el flujo normal de email/password funciona

### Pasos

1. **Generar email único**

   - [ ] Usa: `testuser_[timestamp]@example.com`
   - [ ] Ej: `testuser_20260114@example.com`

2. **Registrarse**

   - [ ] Cambiar a "Registrarse" (si no estás ya)
   - [ ] Email: `testuser_[tu_timestamp]@example.com`
   - [ ] Contraseña: `TestContraseña123`
   - [ ] Haz clic en "Registrarse"
   - [ ] Espera 2 segundos

3. **Verificar Registro Exitoso** ✅

   - [ ] NO aparece mensaje de error
   - [ ] Se redirige automáticamente al dashboard
   - [ ] El dashboard es accesible

4. **Cerrar Sesión**

   - [ ] Busca botón de cerrar sesión
   - [ ] Haz clic
   - [ ] Vuelves a pantalla de login

5. **Login con Credenciales Creadas**

   - [ ] Cambiar a "Entrar" (si no estás ya)
   - [ ] Email: `testuser_[tu_timestamp]@example.com`
   - [ ] Contraseña: `TestContraseña123`
   - [ ] Haz clic en "Entrar"
   - [ ] Espera 2 segundos

6. **Verificar Login Exitoso** ✅
   - [ ] NO aparece mensaje de error
   - [ ] Se redirige automáticamente al dashboard
   - [ ] Está logueado

### Resultado Esperado

```
✅ PASSOU
- Registro con email/password funciona
- Login con email/password funciona
- Flujo normal sin problemas
```

---

## TEST 4: Validar Mensajes de Error

### Propósito

Verificar que otros errores también tienen mensajes claros

### Test 4A: Email Inválido

Pasos:

- [ ] Cambiar a "Registrarse"
- [ ] Email: `notesemail`
- [ ] Contraseña: `TestContraseña123`
- [ ] Haz clic en "Registrarse"
- [ ] Esperado: "El formato del correo no es válido."

### Test 4B: Contraseña Débil

Pasos:

- [ ] Email: `test@example.com`
- [ ] Contraseña: `123`
- [ ] Haz clic en "Registrarse"
- [ ] Esperado: "La contraseña debe tener al menos 6 caracteres."

### Test 4C: Campos Vacíos

Pasos:

- [ ] Email: (vacío)
- [ ] Contraseña: (vacío)
- [ ] Haz clic en "Entrar"
- [ ] Esperado: "Por favor, completa todos los campos"

### Resultado Esperado

```
✅ PASSOU
- Todos los mensajes de error son claros
- Las validaciones funcionan correctamente
```

---

## TEST 5: Verificar No Rompe Google

### Propósito

Asegurar que Google OAuth sigue funcionando

### Pasos

1. **Login con Google**

   - [ ] Haz clic en "Google"
   - [ ] Aparece ventana de Google
   - [ ] Selecciona cuenta (ó crea nueva de prueba)
   - [ ] Autoriza

2. **Verificar Resultado** ✅
   - [ ] NO aparece mensaje de error
   - [ ] Se redirige al dashboard
   - [ ] Dashboard funciona normalmente

### Resultado Esperado

```
✅ PASSOU
- Google OAuth no está roto
- Funciona exactamente como antes
```

---

## MATRIZ DE PRUEBAS

| #   | Caso                 | Pasos       | Resultado Esperado      | Estado |
| --- | -------------------- | ----------- | ----------------------- | ------ |
| 1   | Google → Email/Pass  | Ver TEST 1  | Mensaje "usar Google"   | [ ]    |
| 2   | Email dup. en Google | Ver TEST 2  | Mensaje "ya registrado" | [ ]    |
| 3   | Email/Pass normal    | Ver TEST 3  | Funciona                | [ ]    |
| 4A  | Email inválido       | Ver TEST 4A | Error formato           | [ ]    |
| 4B  | Contraseña débil     | Ver TEST 4B | Error 6 caracteres      | [ ]    |
| 4C  | Campos vacíos        | Ver TEST 4C | Error campos            | [ ]    |
| 5   | Google funciona      | Ver TEST 5  | Funciona                | [ ]    |

---

## ✅ CHECKLIST FINAL

- [ ] TEST 1 passou
- [ ] TEST 2 passou
- [ ] TEST 3 passou
- [ ] TEST 4 passou (todos los sub-tests)
- [ ] TEST 5 passou
- [ ] No hay errores en consola (F12)
- [ ] No hay crashes en la app
- [ ] Los mensajes son claros en español
- [ ] La app no entra en bucle infinito
- [ ] El loading spinner desaparece después de login

---

## 🐛 Si Algo No Funciona

### Problema: "fetchSignInMethodsForEmail no está definido"

**Solución**: Verificar imports en `app/login.tsx`

```typescript
import { fetchSignInMethodsForEmail } from "firebase/auth";
```

### Problema: "Google no muestra ventana"

**Solución**:

- Verifica que `EXPO_PUBLIC_ANDROID_CLIENT_ID` esté en `.env`
- Reconstruir la app: `expo prebuild --clean`

### Problema: "La app se congela al login"

**Solución**:

- Revisar consola (F12)
- Buscar promesas no resueltas
- Reiniciar emulador

### Problema: Los mensajes están en inglés

**Solución**: Verificar strings en el código están en español

---

## 📝 Reportar Resultados

Cuando termines, nota:

- [ ] Fecha de prueba
- [ ] Plataforma (iOS/Android/Web)
- [ ] Versión de app
- [ ] Resultados de cada test
- [ ] Cualquier error que encontraste

---

**Última Actualización**: 14 de enero de 2026
**Versión de Prueba**: v1.0
