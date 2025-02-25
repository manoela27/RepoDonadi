import React from 'react';
import { View, Text, CheckBox, StyleSheet } from 'react-native';

const CheckListMarcas = ({ marcas, marcasVerificadas, handleCheckMarca }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title="Check-list de Marcas Registradas" />
      <Card.Content>
        {marcas.map((marca) => (
          <View key={marca} style={styles.checkListItem}>
            <CheckBox
              value={marcasVerificadas.includes(marca)}
              onValueChange={() => handleCheckMarca(marca)}
            />
            <Text>{marca}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  checkListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default CheckListMarcas;
