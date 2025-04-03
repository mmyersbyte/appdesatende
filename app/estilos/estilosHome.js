import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#1A1A1D',
  backgroundLight: '#2A2A2D',
  primary: '#ba68c8', // Purple color
  accent: '#D84040', // Red color for labels
  border: '#6A1E55',

  text: 'white',
  textWarm: '#ECDCBF', // Beige/cream color for text
  placeholder: '#999',

  white: 'white',
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  /* PESQUISA EMPRESAS */
  searchSection: {
    marginBottom: 16,
  },
  labelPesquisa: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: COLORS.accent,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
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
    color: COLORS.background,
  },
  /* BANNER PRINCIPAL */
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
    fontWeight: 'bold',
    color: COLORS.textWarm,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },

  /* SEÇÃO DE EMPRESAS */
  empresasSection: {
    marginBottom: 20,
  },
  empresasSubtitulo: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.textWarm,
    marginBottom: 15,
  },
  empresasListContainer: {
    paddingRight: 8,
    paddingLeft: 2,
  },
  empresaItem: {
    marginRight: 12,
    alignItems: 'center',
    width: 80,
  },
  empresaImagemContainer: {
    position: 'relative',
    borderRadius: 200,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: COLORS.backgroundLight,
    width: 80,
    height: 80,
  },
  empresaImagem: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  loadingIndicator: {
    position: 'absolute',
    bottom: 10,
  },
  empresaNome: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 4,
    height: 40,
  },

  /* FOOTER */
  footer: {
    justifyContent: 'space-around',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '110%',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.text,
    backgroundColor: COLORS.background,
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.text,
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
