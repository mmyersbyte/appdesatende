import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
const LogoutButton = ({ onLogout }) => {
  const router = useRouter();
  const { fazerLogout } = useAuth();

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
            // USANDO FUNÇÃO INTEGRADA DO HOOK QUE LIMPA STORAGE
            await fazerLogout();

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

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#ff5555',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 7,
    shadowRadius: 2,
    elevation: 2, // Android shadow
  },
  logoutText: {
    color: '#f8f8f2',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default LogoutButton;
