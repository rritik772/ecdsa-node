import React, { useState } from "react";
import server from "./server";

const MintCoins = () => {
  const [sender, setSender] = useState("");
  const [coins, setCoins] = useState(0);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const { balance } = server.post("/minted", {
        sender,
        coins,
      });
      console.log(balance);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container flex">
      <h1>MintCoins</h1>
      <label htmlFor="address">
        Address
        <input
          type="text"
          placeholder="Wallet address"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      </label>
      <label htmlFor="Coins">
        Coins
        <input
          type="number"
          placeholder="Coins"
          value={coins}
          onChange={(e) => setCoins(parseFloat(e.target.value))}
        />
      </label>
      <input type="submit" className="button" value="Mint" onClick={onSubmit} />
    </div>
  );
};

export default MintCoins;
