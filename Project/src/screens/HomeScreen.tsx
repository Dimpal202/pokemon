import React, { useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonList, setViewMode } from '../redux/pokemonSlice';
import { RootState, AppDispatch } from '../redux/store';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const { pokemonList, viewMode } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonList({ type: null }));
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Search Pokémon..." style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 , fontSize:16}} />

      <TouchableOpacity onPress={() => navigation.navigate('FilterScreen')} style={{backgroundColor:"gray",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:18,padding:10,color:"white"}}>Open Filter</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => dispatch(setViewMode(viewMode === 'grid' ? 'list' : 'grid'))}>
        <Text style={{fontSize:18}}>Switch View</Text>
      </TouchableOpacity> */}

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        numColumns={viewMode === 'grid' ? 2 : 1}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderWidth: 1, margin: 5 }}>
            <Text style={{fontSize:14,color:"black"}}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
