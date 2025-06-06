import { StyleSheet } from 'react-native';

const CORES = {
  // Cores de fundo
  fundoPrincipal: '#1A1A1D', // Fundo principal do app
  corPrimaria: '#D84040', // Cor primária vermelha

  // Cores de texto
  textoPrincipal: 'white', // Texto principal branco
  textoSecundario: '#999', // Texto secundário cinza

  // Cores de cartões e bordas
  fundoCartao: 'rgba(255, 255, 255, 0.05)', // Fundo semi-transparente
  bordaClara: 'rgba(255, 255, 255, 0.1)', // Borda clara
  bordaBranca: 'white', // Borda branca

  // Cores de interface
  cinzaEscuro: '#333', // Cinza escuro para elementos
  cinzaEscuroAlt: '#222', // Cinza escuro alternativo
  fundoInput: '#333', // Fundo para campos de entrada
  bordaInput: '#444', // Borda para campos de entrada

  // Cores de status
  fundoSucesso: 'rgba(39, 174, 96, 0.2)', // Verde com opacidade
  fundoErro: 'rgba(231, 76, 60, 0.2)', // Vermelho com opacidade
  fundoErroEscuro: 'rgba(231, 76, 60, 0.8)', // Vermelho mais escuro

  // Cores de modal
  fundoModal: 'rgba(0, 0, 0, 0.7)', // Fundo do modal
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundoPrincipal,
  },
  conteudoPrincipal: {
    flex: 1,
    paddingHorizontal: 16,
  },
  secaoReclamacoes: {
    backgroundColor: CORES.fundoCartao,
    borderRadius: 12,
    padding: 16,
    marginBottom: 80,
  },
  tituloSecao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
    marginBottom: 16,
  },
  itemReclamacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CORES.bordaClara,
  },
  infoReclamacao: {
    flex: 1,
  },
  tituloReclamacao: {
    fontSize: 16,
    color: CORES.textoPrincipal,
    fontWeight: '500',
  },
  empresaReclamacao: {
    fontSize: 14,
    color: CORES.corPrimaria,
    marginTop: 2,
  },
  dataReclamacao: {
    fontSize: 12,
    color: CORES.textoSecundario,
    marginTop: 4,
  },
  statusReclamacao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 90,
    alignItems: 'center',
  },
  respondida: {
    backgroundColor: CORES.fundoSucesso,
  },
  naoRespondida: {
    backgroundColor: CORES.fundoErro,
  },
  textoStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: CORES.textoPrincipal,
  },
  semReclamacoes: {
    color: CORES.textoSecundario,
    textAlign: 'center',
    marginVertical: 20,
  },
  centrarModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundoModal,
  },
  conteudoModal: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: CORES.cinzaEscuroAlt,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cabecalhoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: CORES.corPrimaria,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  tituloModal: {
    color: CORES.textoPrincipal,
    fontSize: 18,
    marginLeft: 26,
  },
  botaoFechar: {
    padding: 5,
  },
  formulario: {
    padding: 20,
  },
  campoFormulario: {
    marginBottom: 16,
  },
  labelFormulario: {
    color: CORES.textoPrincipal,
    fontSize: 14,
    marginBottom: 6,
  },
  inputFormulario: {
    backgroundColor: CORES.fundoInput,
    borderRadius: 8,
    padding: 12,
    color: CORES.textoPrincipal,
    borderWidth: 1,
    borderColor: CORES.bordaInput,
  },
  inputMultiline: {
    minHeight: 100,
  },
  botaoUploadImagem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.fundoInput,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CORES.bordaInput,
    borderStyle: 'dashed',
    padding: 20,
  },
  textoUploadImagem: {
    color: CORES.corPrimaria,
    marginLeft: 10,
    fontSize: 16,
  },
  previewContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  previewImagem: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  botaoRemoverImagem: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: CORES.fundoErroEscuro,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sucessoContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSucesso: {
    color: CORES.textoPrincipal,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default estilos;
