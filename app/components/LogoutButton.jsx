import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * 🚪 COMPONENTE DE LOGOUT MINIMALISTA
 *
 * Componente clean e simples para logout do usuário
 * Segue princípios de responsabilidade única e design minimalista
 *
 * @param {Function} onLogout - Função de logout passada como prop
 * @returns {JSX.Element} Botão de logout estilizado
 */
const LogoutButton = ({ onLogout }) => {
  const router = useRouter();

  /**
   * 🔄 HANDLER DE LOGOUT
   * Executa logout com confirmação e redirecionamento seguro
   */
  const handleLogout = () => {
    Alert.alert('Confirmar Logout', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            // Executa função de logout passada como prop
            if (onLogout && typeof onLogout === 'function') {
              await onLogout();
            }

            // Redireciona para tela inicial
            router.replace('/');
          } catch (error) {
            console.error('Erro durante logout:', error);
            Alert.alert('Erro', 'Falha ao fazer logout. Tente novamente.');
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleLogout}
      activeOpacity={0.7}
    >
      <Text style={styles.logoutText}>SAIR</Text>
    </TouchableOpacity>
  );
};

/**
 * 🎨 ESTILOS MINIMALISTAS
 * Design clean seguindo princípios de UX/UI
 */
const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#ff5555', // Vermelho Dracula para ação destrutiva
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  logoutText: {
    color: '#f8f8f2', // Branco Dracula
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default LogoutButton;
