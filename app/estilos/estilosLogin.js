import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
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
    color: 'white',
  },
  // Estilo para a palavra diferenciada no título
  tituloDiferente: {
    color: '#ba68c8',
  },
  // Estilo do subtítulo
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  // Estilo para a parte diferenciada do subtítulo
  subdiferente: {
    color: '#ba68c8',
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
    color: 'white',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  esqueci: {
    color: '#ba68c8',
    fontWeight: 'bold',
  },
  // Estilo base dos botões
  botao: {
    backgroundColor: '#6A1E55',
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
    color: '#FFF',
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
    backgroundColor: '#FFF',
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
    color: '#6A1E55',
  },
  // Estilo dos inputs (campos de texto)
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#333',
  },
  // Estilo do botão do formulário
  botaoFormulario: {
    backgroundColor: '#6A1E55',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Estilo do texto do botão do formulário
  textoBotaoFormulario: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Botão para fechar o modal (formulário)
  botaoFechar: {
    marginTop: 10,
  },
  textoBotaoFechar: {
    color: '#6A1E55',
    fontSize: 16,
  },
});

export default estilos;
