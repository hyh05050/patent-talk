import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/providers/AuthProvider";
import ModalProvider from "./components/providers/ModalProvider";
import MainRouter from "./components/router";
import { Storage } from "./modules/Storage";

const App = () => {
  const queryClient = new QueryClient();
  useEffect(() => {
    Storage.checkAccessToken().then((tokenValidation) => {
      if(tokenValidation !== -1 && !tokenValidation) {
        console.log("token error");
        Storage.doRefreshAccessToken().then((response) => {
          if (response.data.status == "success") {
            Storage.set("authToken", response.data.authToken);
            Storage.set("refreshToken", response.data.refreshToken);
          } else {
            if(response !== false)  Storage.logout();
          }
        }).catch((error) => {
          Storage.logout();
        });
      }
    });
  }, []);

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
