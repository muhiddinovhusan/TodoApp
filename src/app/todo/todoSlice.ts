import { create } from 'zustand';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoStore {
  loading: boolean;
  todos: Todo[];
  error: string;
  addTodo: (newTodo: string) => void;
  fetchTodos: () => void;
  deleteTodo: (todoId: number) => void;
  toggleTodo: (todo: { id: number; completed: boolean }) => void;
}

const useTodoStore = create<TodoStore>((set) => ({
  loading: false,
  todos: [],
  error: '',
  addTodo: (newTodo: string) => {
    set({ loading: true });
    axios.post<Todo>('http://localhost:3000/todos', { title: newTodo, completed: false })
      .then((response) => {
        set((state) => ({
          todos: [...state.todos, response.data],
          loading: false,
          error: '',
        }));
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  },
  fetchTodos: () => {
    set({ loading: true });
    axios.get<Todo[]>('http://localhost:3000/todos')
      .then((response) => {
        set({ todos: response.data, loading: false, error: '' });
      })
      .catch((error) => {
        set({ loading: false, todos: [], error: error.message });
      });
  },
  deleteTodo: (todoId: number) => {
    set({ loading: true });
    axios.delete(`http://localhost:3000/todos/${todoId}`)
      .then(() => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== todoId),
          loading: false,
          error: '',
        }));
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  },
  toggleTodo: ({ id, completed }: { id: number; completed: boolean }) => {
    set({ loading: true });
    axios.patch<Todo>(`http://localhost:3000/todos/${id}`, { completed: !completed })
      .then((response) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === response.data.id ? { ...todo, completed: response.data.completed } : todo
          ),
          loading: false,
          error: '',
        }));
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  },
}));

export default useTodoStore;
