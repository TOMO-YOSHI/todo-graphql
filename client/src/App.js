import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Title from './components/layout/Title';
import AddTodo from './components/forms/AddTodo';
import Tasks from './components/lists/Tasks';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title />
        <AddTodo />
        <Tasks />
      </div>
    </ApolloProvider>
  );
}

export default App;
