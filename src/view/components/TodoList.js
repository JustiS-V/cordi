// TodoList.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from '../../redux/actions';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    dispatch(addTodo('New Task'));
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <View>
      {todos.map((todo) => (
        <View key={todo.id}>
          <Text>{todo.text}</Text>
          <Button title="Remove" onPress={() => handleRemoveTodo(todo.id)} />
        </View>
      ))}
      <Button title="Add Todo" onPress={handleAddTodo} />
    </View>
  );
};

export default TodoList;
