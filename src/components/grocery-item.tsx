import React from 'react';

import {useAppDispatch} from '../store/hooks';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
} from '../store/groceries.slice';
import {Grocery} from '../types';
import {ButtonText, Box, Text, Button} from '@gluestack-ui/themed';

const GroceryItem = ({item}: {item: Grocery}) => {
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
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
    </Box>
  );
};

export default GroceryItem;
