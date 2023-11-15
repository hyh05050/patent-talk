import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./components/providers/AuthProvider";
import ModalProvider from "./components/providers/ModalProvider";
import MainRouter from "./MainRouter";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModalProvider />
          <AuthProvider>
            <MainRouter />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
