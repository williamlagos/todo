import React, { useState } from 'react';
import { Box, Button, TextInput, Heading } from 'grommet';
import { Subtract, Add } from 'grommet-icons';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <Box>
      <Box direction="row" justify='center'>
        <Button
          icon={<Subtract />}
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <Heading>{count}</Heading>
        <Button
          icon={<Add />}
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </Box>
      <Box direction="row" pad="medium">
        <TextInput
          placeholder="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
      </Box>
      <Box direction="row" gap="medium">
        <Button
          label="Add Amount"
          primary
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        />
        <Button
          label="Add Async"
          secondary
          onClick={() => dispatch(incrementAsync(incrementValue))}
        />
        <Button
          label="Add If Odd"
          secondary
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        />
      </Box>
    </Box>
  );
}
