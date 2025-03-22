import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  secaoFotoPerfil: {
    marginBottom: 24,
  },
  labelFotoPerfil: {
    fontSize: 18,
    color: 'white',
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
    backgroundColor: '#2A2A2D',
  },
  fotoPerfil: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayFotoPerfil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    color: 'white',
    marginBottom: 8,
  },
  inputBio: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    color: '#1A1A1D',
    textAlignVertical: 'top',
  },
  botaoSalvar: {
    backgroundColor: '#ba68c8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  textoBotaoSalvar: {
    color: 'white',
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
    borderTopColor: 'white',
    backgroundColor: '#1A1A1D',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ba68c8',
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
