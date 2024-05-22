import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchGroceries} from '../api';
import {
  Button,
  ButtonText,
  Box,
  Spinner,
  Text,
  FlatList,
  Pressable
} from '@gluestack-ui/themed';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setGroceries} from '../store/groceries.slice';
import GroceryItem from '../components/grocery-item';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const {data, error, isLoading} = useQuery({
    queryKey: ['groceries'],
    queryFn: fetchGroceries,
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setGroceries(data));
    }
  }, [data, dispatch]);
  const {groceries} = useAppSelector(state => state.groceries);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <Box>
      {isLoading && <Spinner size="large" color="#0000ff" />}
      {error && <Text>Error: {error.message}</Text>}
      <Box flexDirection="row" justifyContent="space-around">
        <Pressable onPress={() => handleCategoryFilter('Fruits')}>
          <Text>Fruits</Text>
        </Pressable>
        <Pressable onPress={() => handleCategoryFilter('Vegetables')}>
          <Text>Vegetables</Text>
        </Pressable>
        <Pressable onPress={() => handleCategoryFilter('')}>
          <Text>All</Text>
        </Pressable>
      </Box>
      {groceries && (
        <FlatList
          data={
            selectedCategory
              ? groceries.filter(item => item.category === selectedCategory)
              : groceries
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <GroceryItem item={item} />}
        />
      )}
      <Button marginTop={20} onPress={() => navigation.navigate('Cart')}>
        <ButtonText>Go to Cart</ButtonText>
      </Button>
    </Box>
  );
};
