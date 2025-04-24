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

  // Cores de elementos UI
  branco: '#FFF', // Branco puro para elementos
  bordaInput: '#CCC', // Cor para bordas de campos de entrada
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
  // Estilo base dos botões
  botao: {
    backgroundColor: CORES.corPrimariaEscura,
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
    color: CORES.textoPrincipal,
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
    backgroundColor: CORES.branco,
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
    color: CORES.corPrimaria,
  },
  // Estilo dos inputs (campos de texto)
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: CORES.bordaInput,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: CORES.textoEscuro,
  },
  // Estilo do botão do formulário
  botaoFormulario: {
    backgroundColor: CORES.corPrimaria,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Estilo do texto do botão do formulário
  textoBotaoFormulario: {
    color: CORES.branco,
    fontWeight: '600',
    fontSize: 16,
  },
  // Botão para fechar o modal (formulário)
  botaoFechar: {
    marginTop: 10,
  },
  textoBotaoFechar: {
    color: CORES.corPrimaria,
    fontSize: 16,
  },
});

export default estilos;
