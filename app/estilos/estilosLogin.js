import { StyleSheet } from 'react-native';

// Variáveis de cores padronizadas
const CORES = {
  // BACKGROUND
  fundoPrincipal: '#1A1A1D', // Fundo principal escuro do app

  // Cores principais
  corPrimaria: '#D84040', // Vermelho usado em todo o app
  corPrimariaEscura: '#A31D1D', // Vermelho mais escuro

  // Cores de texto
  textoPrincipal: '#ECDCBF', // Cor bege/creme para textos
  textoEscuro: '#333', // Cor escura para textos em fundos claros
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  // Estilo do título
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: CORES.textoPrincipal,
  },
  // Estilo para a palavra diferenciada no título
  tituloDiferente: {
    color: CORES.corPrimaria,
  },
  // Estilo do subtítulo
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    color: CORES.textoPrincipal,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  // Estilo para a parte diferenciada do subtítulo
  subdiferente: {
    color: CORES.corPrimaria,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  // Estilo da animação
  animacao: {
    width: '100%',
    height: 200,
    marginBottom: 50,
  },
  // Estilo do subtítulo2
  subtitulo2: {
    fontSize: 16,
    textAlign: 'center',
    color: CORES.textoPrincipal,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  esqueci: {
    color: CORES.corPrimaria,
  },
});

export default estilos;
