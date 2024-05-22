import React from 'react';
import {Box, Text, FlatList, Button, ButtonText} from '@gluestack-ui/themed';
import {TextInput} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {removeItemFromCart, renameItemInCart} from '../store/groceries.slice';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
} from '../store/groceries.slice';
import {CartItem} from '../types';

export const CartScreen = () => {
  const cartItems = useAppSelector(state => state.groceries.cartItems);
  const dispatch = useAppDispatch();

  const handleRename = (id: number, customName: string) => {
    dispatch(renameItemInCart({id, customName}));
  };

  return (
    <Box>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Box>
            <TextInput
              value={item.customName}
              onChangeText={text => handleRename(item.id, text)}
            />
            <Text>Price: ${item.price}</Text>
            <Button
              onPress={() =>
                dispatch(
                  increaseItemQuantity({
                    id: item.id,
                    quantity: item.amount + 1,
                  }),
                )
              }>
              <ButtonText>Increase</ButtonText>
            </Button>
            <Text>Quantity: {item.amount}</Text>
            <Button
              onPress={() =>
                dispatch(
                  decreaseItemQuantity({
                    id: item.id,
                    quantity: item.amount - 1,
                  }),
                )
              }>
              <ButtonText>Decrease</ButtonText>
            </Button>
            <Button
              marginTop={20}
              onPress={() => dispatch(removeItemFromCart(item.id))}>
              <ButtonText>Remove</ButtonText>
            </Button>
          </Box>
        )}
      />
    </Box>
  );
};
