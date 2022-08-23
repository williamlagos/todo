import React, { useEffect, useState } from 'react';
import { Box, Button, TextInput, Heading, CheckBox, Paragraph, Tag } from 'grommet';
import { Checkmark, Add } from 'grommet-icons';

import { AppBar } from '../../components/AppBar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addTask,
  listTasks,
  toggleTask,
  emptyTaskName,
  setTaskName,
} from './tasksSlice';

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const newTaskName = useAppSelector(state => state.tasks.newTaskName);
  const [toggleButton, setToggleButton] = useState(true);

  useEffect(() => {
    dispatch(listTasks());
  }, [dispatch]);

  return (
    <Box>
      <AppBar>
          <Heading level="3" margin="none"> ToDo App </Heading>
          {toggleButton ? (
            <Button icon={<Add />} onClick={() => setToggleButton(!toggleButton)} />
          ) : (
            <Button icon={<Checkmark />} onClick={() => {
              dispatch(addTask({id: tasks.length, name: newTaskName, done: false}));
              dispatch(emptyTaskName());
              setToggleButton(!toggleButton);
            }} />
          )} 
        </AppBar>
        <Box direction='column' pad="medium" flex overflow={{ horizontal: 'hidden' }}>
          <Box flex justify="start">
            {!toggleButton && (
              <Box gap="medium" direction="row">
                <CheckBox />
                <TextInput 
                  placeholder="Type the new task" 
                  onChange={(event: any) => dispatch(setTaskName(event.target.value))}
                />
              </Box>
            )}
            {tasks.filter(task => !task.done).map((task: any) => (
              <Box key={task.id} gap="medium" direction="row">
                <CheckBox 
                  checked={task.done}
                  onChange={() => dispatch(toggleTask({ ...task, done: !task.done }))}
                />
                <Paragraph>{task.name}</Paragraph>
              </Box>
            ))}
          </Box>
          <Box flex justify="start">
            <Tag name="Completed" value="Tasks" />
            {tasks.filter(task => task.done).map((task: any) => (
              <Box key={task.id} gap="medium" direction="row">
                <CheckBox 
                  checked={task.done}
                  onChange={() => dispatch(toggleTask({ ...task, done: !task.done }))}
                />
                <Paragraph>{task.name}</Paragraph>
              </Box>
            ))}
          </Box>
        </Box>
    </Box>
  );
}
