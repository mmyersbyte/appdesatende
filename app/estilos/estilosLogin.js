import { StyleSheet } from 'react-native';

// Color variables
const COLORS = {
  // Primary colors
  background: '#1A1A1D',
  primary: '#D84040', // Red color used throughout the app
  primaryDarker: '#A31D1D', // Darker red for buttons

  // Text colors
  textPrimary: '#ECDCBF', // Beige/cream color for text
  textDark: '#333',

  // UI element colors
  white: '#FFF',
  inputBorder: '#CCC',
};

const estilos = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.textPrimary,
  },
  // Estilo para a palavra diferenciada no título
  tituloDiferente: {
    color: COLORS.primary,
  },
  // Estilo do subtítulo
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.textPrimary,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  // Estilo para a parte diferenciada do subtítulo
  subdiferente: {
    color: COLORS.primary,
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
    color: COLORS.textPrimary,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  esqueci: {
    color: COLORS.primary,
  },
  // Estilo base dos botões
  botao: {
    backgroundColor: COLORS.primaryDarker,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: '86%',
  },
  // Opacidade ao pressionar o botão
  botaoPressionado: {
    opacity: 0.2,
  },
  // Linha interna do botão para alinhar ícone e texto
  linhaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  // Container do ícone à esquerda
  iconeEsquerdo: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Container para centralizar o texto
  textoCentral: {
    flex: 1,
    alignItems: 'center',
  },
  // Placeholder para equilibrar o layout
  iconeDireito: {
    width: 50,
  },
  // Estilo do texto dos botões
  textoBotao: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 16,
  },
  // Estilos do modal
  modalFundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  modalConteudo: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
  },
  // Estilos para o container do formulário dentro do modal
  formularioContainer: {
    alignItems: 'center',
  },
  // Estilo do título do formulário
  tituloFormulario: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  // Estilo dos inputs (campos de texto)
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: COLORS.textDark,
  },
  // Estilo do botão do formulário
  botaoFormulario: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Estilo do texto do botão do formulário
  textoBotaoFormulario: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  // Botão para fechar o modal (formulário)
  botaoFechar: {
    marginTop: 10,
  },
  textoBotaoFechar: {
    color: COLORS.primary,
    fontSize: 16,
  },
});

export default estilos;
