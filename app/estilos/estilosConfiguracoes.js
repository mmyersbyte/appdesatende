import { StyleSheet } from 'react-native';

const COLORS = {
  background: '#1A1A1D',
  backgroundDarker: '#2A2A2D',

  primary: '#D84040',
  border: '#6A1E55',
  textPrimary: '#ECDCBF', // Beige/cream color for text
  textDark: '#1A1A1D',

  // Overlay
  overlayDark: 'rgba(0, 0, 0, 0.4)',
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  secaoFotoPerfil: {
    marginBottom: 24,
  },
  labelFotoPerfil: {
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  botaoAlterarFoto: {
    alignItems: 'center',
  },
  containerFotoPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundDarker,
  },
  fotoPerfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayFotoPerfil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlayDark,
    borderRadius: 75,
  },
  iconeCamera: {
    position: 'absolute',
  },
  secaoBio: {
    marginBottom: 24,
  },
  labelBio: {
    fontSize: 18,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  inputBio: {
    backgroundColor: COLORS.textPrimary,
    borderRadius: 8,
    padding: 12,
    color: COLORS.textDark,
    textAlignVertical: 'top',
  },
  botaoSalvar: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  textoBotaoSalvar: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
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
    borderTopColor: COLORS.textPrimary,
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
    borderBottomColor: COLORS.primary,
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
