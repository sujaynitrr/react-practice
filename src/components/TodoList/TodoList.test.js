import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  test('renders the todo input and add button', () => {
    render(<TodoList />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    // Type a new todo
    await user.type(inputElement, 'Test Todo');
    expect(inputElement).toHaveValue('Test Todo');
    
    // Click the add button
    await user.click(addButton);
    
    // Check if the todo is added
    const todoItem = screen.getByText('Test Todo');
    expect(todoItem).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(inputElement).toHaveValue('');
  });

  test('does not add empty todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    // Click add without entering any text
    await user.click(addButton);
    
    // Check that no todo was added
    const todoList = screen.getByTestId('todo-list');
    expect(todoList.children).toHaveLength(0);
  });

  test('deletes a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Add a todo first
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    await user.type(inputElement, 'Test Todo');
    await user.click(addButton);
    
    // Find and click the delete button
    const deleteButton = screen.getByText('Delete');
    await user.click(deleteButton);
    
    // Check if the todo is removed
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });

  test('toggles todo completion', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Add a todo first
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    await user.type(inputElement, 'Test Todo');
    await user.click(addButton);
    
    // Find and click the complete button
    const completeButton = screen.getByText('Complete');
    await user.click(completeButton);
    
    // Check if the todo is marked as complete (underlined)
    const todoItem = screen.getByText('Test Todo');
    expect(todoItem).toHaveStyle('text-decoration: underline');
    
    // Button should now say "Undo"
    const undoButton = screen.getByText('Undo');
    expect(undoButton).toBeInTheDocument();
    
    // Click again to toggle back
    await user.click(undoButton);
    expect(todoItem).toHaveStyle('text-decoration: none');
    
    // Button should say "Complete" again
    expect(screen.getByText('Complete')).toBeInTheDocument();
  });

  test('edits a todo', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Add a todo first
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    await user.type(inputElement, 'Test Todo');
    await user.click(addButton);
    
    // Find and click the edit button
    const editButton = screen.getByText('Edit');
    await user.click(editButton);
    
    // Check if the input is populated with the todo text
    expect(inputElement).toHaveValue('Test Todo');
    
    // Clear the input and type new text
    await user.clear(inputElement);
    await user.type(inputElement, 'Updated Todo');
    
    // Click add to save the edit
    await user.click(addButton);
    
    // Check if the todo is updated
    expect(screen.getByText('Updated Todo')).toBeInTheDocument();
    
    // The old todo text should be replaced with the new one
    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
    
    // The input should be cleared after edit
    expect(inputElement).toHaveValue('');
  });

  test('cancels edit when input is empty', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    // Add a todo first
    const inputElement = screen.getByTestId('todo-input');
    const addButton = screen.getByText('Add');
    
    await user.type(inputElement, 'Test Todo');
    await user.click(addButton);
    
    // Find and click the edit button
    const editButton = screen.getByText('Edit');
    await user.click(editButton);
    
    // Clear the input
    await user.clear(inputElement);
    
    // Click add with empty input (should cancel the edit)
    await user.click(addButton);
    
    // The original todo should still be there
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });
});
