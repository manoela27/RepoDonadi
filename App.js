import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Alert, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcVrqdNRI4qD_YF01PUxwEABpbsMLaDXs",
  authDomain: "repositoriodonadi.firebaseapp.com",
  databaseURL: "https://repositoriodonadi-default-rtdb.firebaseio.com",
  projectId: "repositoriodonadi",
  storageBucket: "repositoriodonadi.firebasestorage.app",
  messagingSenderId: "875455952905",
  appId: "1:875455952905:web:9b5689ce414647386fa0d8",
  measurementId: "G-JFF46YRRVL"
};


const App = () => {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [id, setId] = useState(null);

    const fetchProdutos = async () => {
        const produtosRef = database().ref('produtos');
        produtosRef.on('value', snapshot => {
            const data = snapshot.val();
            const produtosList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setProdutos(produtosList);
        });
    };

    const adicionarProduto = async () => {
        if (!nome || !descricao || !preco) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        const produtosRef = database().ref('produtos');
        const newProdutoRef = produtosRef.push();
        await newProdutoRef.set({
            nome,
            descricao,
            preco: parseFloat(preco),
        });
        setNome('');
        setDescricao('');
        setPreco('');
    };


    const atualizarProduto = async () => {
        if (!nome || !descricao || !preco || !id) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        const produtoRef = database().ref(`produtos/${id}`);
        await produtoRef.update({
            nome,
            descricao,
            preco: parseFloat(preco),
        });
        setNome('');
        setDescricao('');
        setPreco('');
        setId(null);
    };
    const excluirProduto = async (id) => {
        const produtoRef = database().ref(`produtos/${id}`);
        await produtoRef.remove();
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={descricao}
                onChangeText={setDescricao}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço"
                value={preco}
                onChangeText={setPreco}
                keyboardType="numeric"
            />
            <Button title={id ? "Atualizar Produto" : "Adicionar Produto"} onPress={id ? atualizarProduto : adicionarProduto} />
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.nome}</Text>
                        <Text>{item.descricao}</Text>
                        <Text>R$ {item.preco}</Text>
                        <Button title="Editar" onPress={() => {
                            setNome(item.nome);
                            setDescricao(item.descricao);
                            setPreco(item.preco.toString());
                            setId(item.id);
                        }} />
                        <Button title="Excluir" onPress={() => excluirProduto(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    item: {
        marginBottom: 15,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
});

export default App;