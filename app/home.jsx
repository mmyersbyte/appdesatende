import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function HomeScreen() {
  // Estados para controlar a visibilidade dos modais
  const [modalReclamacaoVisivel, setModalReclamacaoVisivel] = useState(false);
  const [modalHistoricoVisivel, setModalHistoricoVisivel] = useState(false);

  // Estados para os campos de reclamação (exemplo de "CRUD" futuro)
  const [empresa, setEmpresa] = useState('');
  const [tituloReclamacao, setTituloReclamacao] = useState('');
  const [descricaoReclamacao, setDescricaoReclamacao] = useState('');
  const [imagemOpcional, setImagemOpcional] = useState('');

  // Função de envio de reclamação (futuro CRUD)
  const enviarReclamacao = () => {
    // Aqui você implementaria a lógica para enviar a reclamação ao backend
    console.log('Enviar reclamação:', {
      empresa,
      tituloReclamacao,
      descricaoReclamacao,
      imagemOpcional,
    });
    // Após enviar, pode fechar o modal e limpar os campos
    setModalReclamacaoVisivel(false);
    setEmpresa('');
    setTituloReclamacao('');
    setDescricaoReclamacao('');
    setImagemOpcional('');
  };

  return (
    <View style={estilos.container}>
      {/* Pesquisar Empresa */}
      <View style={estilos.searchSection}>
        <Text style={estilos.labelPesquisa}>Pesquise uma empresa</Text>
        <View style={estilos.searchContainer}>
          <FontAwesome
            name='search'
            size={20}
            color={corPlaceholder}
            style={estilos.searchIcon}
          />
          <TextInput
            style={estilos.searchInput}
            placeholder='Digite o nome da empresa...'
            placeholderTextColor={corPlaceholder}
          />
        </View>
      </View>

      {/* Banner Principal (imagem) */}
      <View style={estilos.bannerContainer}>
        <Image
          style={estilos.bannerImagem}
          source={{
            uri: 'https://via.placeholder.com/400x200.png?text=Banner+Principal',
          }}
        />
      </View>

      {/* Texto explicativo */}
      <Text style={estilos.textoExplicativo}>
        Bem-vindo ao <Text style={estilos.textoDestaque}>Desatende</Text>! Aqui
        você pode relatar experiências de atendimento ruim, ajudar outros
        consumidores e incentivar empresas a melhorarem seus serviços.
      </Text>

      {/* Botões principais */}
      <View style={estilos.botoesContainer}>
        {/* Botão - Faça uma reclamação */}
        <TouchableOpacity
          style={estilos.botaoQuadrado}
          onPress={() => setModalReclamacaoVisivel(true)}
        >
          <FontAwesome
            name='exclamation-circle'
            size={28}
            color='#fff'
          />
          <Text style={estilos.botaoTexto}>Faça uma reclamação</Text>
        </TouchableOpacity>

        {/* Botão - Minhas Reclamações */}
        <TouchableOpacity
          style={estilos.botaoQuadrado}
          onPress={() => setModalHistoricoVisivel(true)}
        >
          <FontAwesome
            name='list-alt'
            size={28}
            color='#fff'
          />
          <Text style={estilos.botaoTexto}>Minhas Reclamações</Text>
        </TouchableOpacity>
      </View>

      {/* Modal - Faça uma reclamação */}
      <Modal
        visible={modalReclamacaoVisivel}
        animationType='fade'
        transparent
        onRequestClose={() => setModalReclamacaoVisivel(false)}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalConteudo}>
            <Text style={estilos.modalTitulo}>Nova Reclamação</Text>
            <ScrollView style={{ marginVertical: 8 }}>
              <Text style={estilos.modalLabel}>Empresa</Text>
              <TextInput
                style={estilos.modalInput}
                placeholder='Ex: Empresa X'
                placeholderTextColor={corPlaceholder}
                value={empresa}
                onChangeText={setEmpresa}
              />

              <Text style={estilos.modalLabel}>Título da Reclamação</Text>
              <TextInput
                style={estilos.modalInput}
                placeholder='Ex: Atendimento demorou muito'
                placeholderTextColor={corPlaceholder}
                value={tituloReclamacao}
                onChangeText={setTituloReclamacao}
              />

              <Text style={estilos.modalLabel}>Descrição</Text>
              <TextInput
                style={[estilos.modalInput, { height: 80 }]}
                placeholder='Descreva o ocorrido...'
                placeholderTextColor={corPlaceholder}
                value={descricaoReclamacao}
                onChangeText={setDescricaoReclamacao}
                multiline
              />

              <Text style={estilos.modalLabel}>
                Adicionar Imagem (opcional)
              </Text>
              <TextInput
                style={estilos.modalInput}
                placeholder='URL da imagem ou caminho local'
                placeholderTextColor={corPlaceholder}
                value={imagemOpcional}
                onChangeText={setImagemOpcional}
              />
            </ScrollView>

            <View style={estilos.modalBotoes}>
              <TouchableOpacity
                style={[estilos.modalBotao, { marginRight: 8 }]}
                onPress={() => setModalReclamacaoVisivel(false)}
              >
                <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={estilos.modalBotao}
                onPress={enviarReclamacao}
              >
                <Text style={estilos.modalBotaoTexto}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal - Histórico de Reclamações */}
      <Modal
        visible={modalHistoricoVisivel}
        animationType='fade'
        transparent
        onRequestClose={() => setModalHistoricoVisivel(false)}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalConteudo}>
            <Text style={estilos.modalTitulo}>Minhas Reclamações</Text>
            <Text style={estilos.modalTexto}>
              (Exemplo) Aqui apareceriam todas as suas reclamações já enviadas,
              com possibilidade de edição, exclusão, etc.
            </Text>
            <TouchableOpacity
              style={estilos.modalBotao}
              onPress={() => setModalHistoricoVisivel(false)}
            >
              <Text style={estilos.modalBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <View style={estilos.footer}>
        {/* Ícone Home - selecionado (sublinhado) */}
        <TouchableOpacity style={estilos.footerItem}>
          <View style={estilos.footerItemSelecionado}>
            <FontAwesome
              name='home'
              size={24}
              color={corRoxa}
            />
            <Text style={[estilos.footerTexto, { color: corRoxa }]}>Home</Text>
          </View>
        </TouchableOpacity>

        {/* Ícone Perfil - vazio para personalizar depois */}
        <TouchableOpacity style={estilos.footerItem}>
          <View style={estilos.footerItemNaoSelecionado}>
            <FontAwesome
              name='user'
              size={24}
              color='#555'
            />
            <Text style={[estilos.footerTexto, { color: '#555' }]}>
              Seu Perfil
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* Paleta de cores */
const corRoxa = '#7F00FF';
const corPlaceholder = '#999';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  /* PESQUISA */
  searchSection: {
    marginBottom: 16,
  },
  labelPesquisa: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderColor: corRoxa,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  /* BANNER */
  bannerContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  bannerImagem: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  /* TEXTO EXPLICATIVO */
  textoExplicativo: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  textoDestaque: {
    color: corRoxa,
    fontWeight: 'bold',
  },
  /* BOTÕES PRINCIPAIS */
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botaoQuadrado: {
    width: '48%',
    backgroundColor: corRoxa,
    borderRadius: 8,
    padding: 16,
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
    maxHeight: '80%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: corRoxa,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: corRoxa,
    marginBottom: 8,
  },
  modalTexto: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  modalInput: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderColor: corRoxa,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
    color: '#333',
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  modalBotao: {
    backgroundColor: corRoxa,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalBotaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  /* FOOTER */
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerItemSelecionado: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: corRoxa,
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
