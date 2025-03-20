//HOME AFTER LOGIN

import React, { useState } from 'react';
import estilos from './estilos/estilosHome';
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
        <Text style={estilos.labelPesquisa}>DESATENDE</Text>
        <View style={estilos.searchContainer}>
          <FontAwesome
            name='search'
            size={20}
            color={'#999'}
            style={estilos.searchIcon}
          />
          <TextInput
            style={estilos.searchInput}
            placeholder='Digite o nome da empresa...'
            placeholderTextColor={'#999'}
          />
        </View>
      </View>

      {/* Banner Principal (imagem) */}
      <View style={estilos.bannerContainer}>
        <Image
          style={estilos.bannerImagem}
          source={require('./desatendeHome.jpg')}
        />
      </View>
      {/* Texto explicativo */}
      <Text style={estilos.textoExplicativo}>
        Aqui você pode relatar experiências de atendimento ruim, ajudar outros
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
                placeholderTextColor={'#999'}
                value={empresa}
                onChangeText={setEmpresa}
              />

              <Text style={estilos.modalLabel}>Título da Reclamação</Text>
              <TextInput
                style={estilos.modalInput}
                placeholder='Ex: Atendimente gritou comigo'
                placeholderTextColor={'#999'}
                value={tituloReclamacao}
                onChangeText={setTituloReclamacao}
              />

              <Text style={estilos.modalLabel}>Descrição</Text>
              <TextInput
                style={[estilos.modalInput, { height: 80 }]}
                placeholder='Descreva o ocorrido...'
                placeholderTextColor={'#999'}
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
                placeholderTextColor={'#999'}
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
      {/* Aqui fixo o modal acima do footer em todos os celulares, adicionando justifyContent 'flex-end' e paddingBottom */}
      <Modal
        visible={modalHistoricoVisivel}
        animationType='fade'
        transparent
        onRequestClose={() => setModalHistoricoVisivel(false)}
      >
        <View
          style={[
            estilos.modalFundo,
            { justifyContent: 'flex-end', paddingBottom: 60 },
          ]}
        >
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
              color={'#6A1E55'}
            />
            <Text style={[estilos.footerTexto, { color: 'white' }]}>Home</Text>
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
