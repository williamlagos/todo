import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  CheckBox,  
  Heading, 
  Paragraph,
  Spinner, 
  TextInput,
  Tag, 
} from "grommet";
import { Checkmark, Add } from "grommet-icons";

import { AppBar } from "../../components/AppBar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addTask,
  listTasks,
  toggleTask,
  emptyTaskName,
  setTaskName,
} from "./tasksSlice";

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.tasks.tasks);
  const status = useAppSelector(state => state.tasks.status);
  const newTaskName = useAppSelector(state => state.tasks.newTaskName);
  const [toggleButton, setToggleButton] = useState(true);

  useEffect(() => {
    dispatch(listTasks());
  }, [dispatch]);

  return (
    <>
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
      { status === "loading" ? (
        <Box align="center" basis="full" justify="center">
          <Spinner size="large"/>
        </Box>
      ) : (
        <Box direction="column" flex overflow={{ vertical: "scroll", horizontal: "hidden" }}>
          <Box justify="start" pad="small" flex="grow">
            {!toggleButton && (
              <Box gap="medium" align="small" basis="small" direction="row">
                <CheckBox />
                <TextInput 
                  placeholder="Type the new task" 
                  onChange={(event: any) => dispatch(setTaskName(event.target.value))}
                />
              </Box>
            )}
            {tasks.filter(task => !task.done).map((task: any) => (
              <Box key={task.id} gap="medium" align="center" margin="small" pad="small" direction="row">
                <CheckBox 
                  checked={task.done}
                  onChange={() => dispatch(toggleTask({ ...task, done: !task.done }))}
                />
                <Paragraph margin="none">{task.name}</Paragraph>
              </Box>
            ))}
          </Box>
          <Box justify="start" pad="small" flex="shrink">
            <Tag name="Completed" value="Tasks" />
            <Box margin="small"></Box>
            {tasks.filter(task => task.done).map((task: any) => (
              <Box key={task.id} gap="medium" align="center" margin="small" pad="small" direction="row">
                <CheckBox 
                  checked={task.done}
                  onChange={() => dispatch(toggleTask({ ...task, done: !task.done }))}
                />
                <Paragraph margin="none">{task.name}</Paragraph>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
