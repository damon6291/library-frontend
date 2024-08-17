import { ToastContainer } from 'react-toastify';
import Router from './routes/routes';
import ThemeProvider from './theme';
import './app.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import 'react-toastify/dist/ReactToastify.css';
import { MountPoint } from './components/dialog/confirmation';
import { setAxiosToken } from './utils/token';

function App() {
  setAxiosToken();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider>
          <MountPoint />
          <Router />
        </ThemeProvider>
      </LocalizationProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
