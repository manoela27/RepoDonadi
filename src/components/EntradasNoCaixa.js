
import React, { useState } from 'react';
import { TextInput, Button, Card, Text, StyleSheet } from 'react-native';

const EntradasNoCaixa = ({ calcularTotal }) => {
  const [novaEntrada, setNovaEntrada] = useState('');

  const adicionarEntrada = () => {
    if (novaEntrada !== '') {
      calcularTotal(parseFloat(novaEntrada));
      setNovaEntrada('');
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Cálculo de Entradas no Caixa" />
      <Card.Content>
        <TextInput
          style={styles.input}
          placeholder="Valor da Entrada"
          keyboardType="numeric"
          value={novaEntrada}
          onChangeText={setNovaEntrada}
        />
        <Button title="Adicionar Entrada" onPress={adicionarEntrada} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default EntradasNoCaixa;
