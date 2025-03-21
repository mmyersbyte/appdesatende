import { StyleSheet } from 'react-native';
const corPlaceholder = '#999';
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  /* PESQUISA */
  searchSection: {
    marginBottom: 16,
  },
  labelPesquisa: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#ba68c8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#6A1E55',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 7,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  /* BANNER */
  bannerContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerImagem: {
    width: '100%',
    height: 190,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  /* TEXTO EXPLICATIVO */
  textoExplicativo: {
    fontSize: 17,
    padding: 0,
    color: 'white',
    lineHeight: 24,
    marginBottom: 130,
  },
  /* BOTÕES PRINCIPAIS */
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaoQuadrado: {
    width: '50%',
    backgroundColor: 'transparent',
    borderRadius: 8,

    padding: 36,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  /* MODAIS */
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConteudo: {
    width: '85%',
    maxHeight: '100%',
    backgroundColor: 'rgba(27, 27, 27, 0.85)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  modalTitulo: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  modalTexto: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginTop: 8,
  },
  modalInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
    color: '#333',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalBotao: {
    backgroundColor: '#6A1E55',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalBotaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  /* FOOTER */
  footer: {
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopColor: '#6A1E55',
    position: 'absolute', // Fixa o footer na tela
    bottom: 0, // Coloca o footer na base
    width: '110%', // Ocupa toda a largura
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 4,
  },
  footerItemNaoSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 4,
  },
  footerTexto: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default estilos;
