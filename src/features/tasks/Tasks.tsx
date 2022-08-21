import React, { useState } from 'react';
import { Box, Button, TextInput, Heading, CheckBox, Paragraph, Tag } from 'grommet';
import { Checkmark, Add } from 'grommet-icons';

import { AppBar } from '../../components/AppBar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Task } from './tasksSlice';
import {
  addTask,
  toggleTask,
} from './tasksSlice';



export const Tasks = () => {
  const dispatch = useAppDispatch();
  const initialTasks = useAppSelector(state => state.tasks.tasks);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [toggleButton, setToggleButton] = useState(true);
  return (
    <Box>
      <AppBar>
          <Heading level="3" margin="none"> ToDo App </Heading>
          <Button icon={toggleButton ? <Add /> : <Checkmark />} onClick={() => {
            setTasks(toggleButton && tasks.slice(-1)[0].name.length > 0 ? 
              [...tasks, {id: tasks.length + 1, name: "", done: false}] : 
              [...tasks.slice(0, -1), {id: tasks.length, name: newTask, done: false}]);
            setToggleButton(!toggleButton);
            setNewTask(newTask.length > 0 ? "" : newTask);
          }}/>
        </AppBar>
        <Box direction='column' pad="medium" flex overflow={{ horizontal: 'hidden' }}>
          <Box flex justify="start">
            {/*<Counter />*/}
            {tasks.filter(task => !task.done).map((task: any) => (
              <Box key={task.id} gap="medium" direction="row">
                <CheckBox 
                  checked={task.done}
                  onChange={(event: any) => {
                    setTasks(tasks.map(t => (t.id === task.id ? {...t, done: event.target.checked} : t)));
                  }}
                />
                {task.name.length > 0 ? (
                  <Paragraph
                    onClick={(event: any) => {
                      setTasks(tasks.map(t => (t.id === task.id ? {...t, name: ""} : t)));
                      setToggleButton(!toggleButton);
                    }}
                  >
                    {task.name}
                  </Paragraph>
                  ) : (
                  <TextInput 
                    placeholder="Type the new task" 
                    onChange={(event: any) => setNewTask(event.target.value)}
                  />
                )}
              </Box>
            ))}
          </Box>
          <Box flex justify="start">
            <Tag name="Completed" value="Tasks" />
            {tasks.filter(task => task.done).map((task: any) => (
              <Box key={task.id} gap="medium" direction="row">
                <CheckBox 
                  checked={task.done}
                  onChange={(event: any) => { 
                    setTasks(tasks.map(t => (t.id === task.id ? {...t, done: event.target.checked} : t))); 
                  }}
                />
                <Paragraph
                  onClick={(event: any) => {
                    setTasks(tasks.map(t => (t.id === task.id ? {...t, name: ""} : t)));
                    setToggleButton(!toggleButton);
                  }}
                >
                  {task.name}
                </Paragraph>
              </Box>
            ))}
          </Box>
        </Box>
        {/*<Box direction="row" gap="medium">
          <Button
            label="Add Async"
            secondary
            onClick={() => dispatch(incrementAsync(1))}
          />
          </Box>*/}
    </Box>
  );
}
