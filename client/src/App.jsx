import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import Address from "./Address";
import GeneratedAddress from "./GeneratedAddress";
import MintCoins from "./MintCoins";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);

  return (
    <div>
      <div className="app">
        <Wallet
          balance={balance}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Transfer setBalance={setBalance} address={address} addresses={addresses} />
        <Address addresses={addresses} setAddresses={setAddresses} />
      </div>
      <div className="app" style={{ marginTop: "20px" }}>
        <GeneratedAddress addresses={addresses} />
        <MintCoins addresses={addresses} setAddresses={setAddresses} />
      </div>
    </div>
  );
}

export default App;
