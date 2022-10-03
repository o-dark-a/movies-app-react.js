import './App.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import RoutesList from './routes/RoutesList';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Provider store={store}>
          <div className="app-wrap container">
            <RoutesList />
          </div>
        </Provider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
