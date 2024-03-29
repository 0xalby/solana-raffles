import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import Head from "next/head";
import { FC, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { Menu } from "../src/components/menu/menu";
import { ContractProvider } from "../src/context/contract";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.scss");

const App: FC<AppProps> = ({ Component, pageProps }) => {

  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = 'https://mainnet.helius-rpc.com/?api-key=4cfa0f42-6b5c-48db-81f5-794c7d5f60eb'
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ContractProvider>
            <Toaster/>
            <Menu />
            <Component {...pageProps} />
          </ContractProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
