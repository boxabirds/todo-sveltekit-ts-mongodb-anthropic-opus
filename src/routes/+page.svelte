<script lang="ts">
    import { onMount } from 'svelte';
  
    let todos: any[] = [];
    let newTodo = '';
  
    async function loadTodos() {
      const res = await fetch('/todos');
      const data = await res.json();
      todos = data.todos;
    }
  
    async function addTodo() {
      const res = await fetch('/todos', {
        method: 'POST',
        body: JSON.stringify({ text: newTodo, completed: false }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      newTodo = '';
      await loadTodos();
    }
  
    async function toggleTodo(todo: any) {
      await fetch('/todos', {
        method: 'PUT',
        body: JSON.stringify({ _id: todo._id, completed: !todo.completed }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await loadTodos();
    }
  
    async function deleteTodo(todo: any) {
      await fetch('/todos', {
        method: 'DELETE',
        body: JSON.stringify({ _id: todo._id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await loadTodos();
    }
  
    onMount(loadTodos);
  </script>
  
  <main>
    <h1>Todo App</h1>
    <form on:submit|preventDefault={addTodo}>
      <input type="text" bind:value={newTodo} placeholder="Enter a new todo" />
      <button type="submit">Add</button>
    </form>
    <ul>
      {#each todos as todo}
        <li class:completed={todo.completed}>
          <button on:click={() => toggleTodo(todo)}>{todo.text}</button>
          <button on:click={() => deleteTodo(todo)}>Delete</button>
        </li>
      {/each}
    </ul>
  </main>

  
  <style>
    .completed {
      text-decoration: line-through;
    }
  </style>