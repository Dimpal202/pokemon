import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonTypes, fetchPokemonList } from '../redux/pokemonSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useNavigation } from '@react-navigation/native';

const FilterScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { pokemonTypes } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonTypes());
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 20, }}>
      <TouchableOpacity onPress={() => dispatch(fetchPokemonList({ type: null }))}>
        <Text  style={{fontSize:18,marginBottom:18}}>All Pokémon</Text>
      </TouchableOpacity>

      <FlatList
        data={pokemonTypes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(fetchPokemonList({ type: item.name }));
              navigation.goBack();
            }}
            style={{ padding: 10, borderWidth: 1, marginVertical: 5,backgroundColor:"gray" }}
          >
            <Text style={{fontSize:16,color:"white",}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FilterScreen;
