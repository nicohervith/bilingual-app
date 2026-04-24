/**
 * COMPONENTE ADICIONAL: LinkMultipleAuthMethods
 *
 * Este es código de referencia para implementar en el futuro
 * la opción de enlazar múltiples métodos de autenticación a una cuenta.
 *
 * Por ejemplo, un usuario que se registró con Google podría agregar
 * email/contraseña como un método alternativo de login.
 */

import { EmailAuthProvider, linkWithCredential, User } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LinkAuthModalProps {
  visible: boolean;
  user: User | null;
  onClose: () => void;
  onSuccess: () => void;
}

/**
 * Modal para enlazar email/contraseña a una cuenta existente (ej: Google)
 */
export const LinkAuthModal: React.FC<LinkAuthModalProps> = ({
  visible,
  user,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkEmailAuth = async () => {
    if (!email || !password || !user) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, credential);

      Alert.alert(
        "Éxito",
        "Email y contraseña agregados a tu cuenta. Ahora puedes iniciar sesión con ambos métodos."
      );
      onSuccess();
      onClose();
    } catch (error: any) {
      let errorMessage = "Error al enlazar email";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "Este email ya está registrado en otra cuenta. Usa otro email.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña debe tener al menos 6 caracteres";
          break;
        case "auth/invalid-email":
          errorMessage = "El formato del email no es válido";
          break;
        case "auth/credential-already-in-use":
          errorMessage =
            "Este email ya está asociado a otro método de autenticación";
          break;
        case "auth/provider-already-linked":
          errorMessage = "Este método de autenticación ya está enlazado";
          break;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Agregar Email y Contraseña</Text>
          <Text style={styles.subtitle}>
            Puedas usar estos datos para iniciar sesión además de tu cuenta de
            Google
          </Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Contraseña (mín. 6 caracteres)"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLinkEmailAuth}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Procesando..." : "Agregar"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  cancelButton: {
    padding: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#666",
    fontSize: 14,
  },
});

/**
 * EJEMPLO DE USO EN LOGIN.TSX:
 *
 * 1. Agregar estado en el componente Login:
 *    const [showLinkingModal, setShowLinkingModal] = useState(false);
 *
 * 2. Después de autenticarse con Google exitosamente:
 *    setTimeout(() => {
 *      // Opcionalmente mostrar modal para enlazar email/password
 *      // setShowLinkingModal(true);
 *      router.replace("/");
 *    }, 500);
 *
 * 3. Renderizar el componente al final del return:
 *    <LinkAuthModal
 *      visible={showLinkingModal}
 *      user={auth.currentUser}
 *      onClose={() => setShowLinkingModal(false)}
 *      onSuccess={() => router.replace("/")}
 *    />
 */
