import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  HomePage,
  ExplorePage,
  ListTokenPage,
  CharacterCreationPage,
  DashboardPage,
  LiveStreamPage,
} from "./pages";
import { WalletProvider } from "./WalletProvider";
import { ToastProvider } from "./hooks/toast";
import { Provider as JotaiProvider } from "jotai";

// Add type declaration for ethereum provider
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

// Define token data interface
interface TokenData {
  name: string;
  symbol: string;
  supply: string;
  imageUrl: string;
  description: string;
  website: string;
  twitter: string;
  telegram: string;
  discord: string;
  youtube: string;
}

const App = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  const updateTokenData = (data: TokenData) => {
    setTokenData(data);
  };

  return (
    <JotaiProvider>
      <WalletProvider>
        <ToastProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route
                path="/list-token"
                element={
                  <ListTokenPage
                    updateTokenData={updateTokenData}
                    tokenData={null}
                  />
                }
              />
              <Route
                path="/create-character"
                element={
                  <CharacterCreationPage
                    initialTokenData={tokenData}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <DashboardPage />
                }
              />
              <Route path="/stream/:tokenId" element={<LiveStreamPage />} />
            </Routes>
            <Footer />
          </Router>
        </ToastProvider>
      </WalletProvider>
    </JotaiProvider>
  );
};

export default App;
