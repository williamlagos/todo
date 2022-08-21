import { useState } from 'react';
import { Box, Button, Heading, Grommet, CheckBox, TextInput, Paragraph, Tag } from 'grommet';
import { Add, Checkmark } from 'grommet-icons';

// import { Counter } from './features/counter/Counter';

const theme = {
  global: {
    colors: {
      brand: '#4D61FC',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', done: false },
    { id: 2, name: 'Task 2', done: false },
    { id: 3, name: 'Task 3', done: false },
    { id: 4, name: 'Task 4', done: true },
    { id: 5, name: 'Task 5', done: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [toggleButton, setToggleButton] = useState(true);
  return (
    <Grommet theme={theme} full>
      <Box fill>
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
      </Box>
    </Grommet>
  );
}

export default App;
