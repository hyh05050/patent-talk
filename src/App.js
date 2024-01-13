import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/providers/AuthProvider";
import ModalProvider from "./components/providers/ModalProvider";
import MainRouter from "./components/router";
import { Storage } from "./modules/Storage";

const App = () => {
  const queryClient = new QueryClient();
  if(!Storage.checkAccessToken()) {
    Storage.doRefreshAccessToken();
  }
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
