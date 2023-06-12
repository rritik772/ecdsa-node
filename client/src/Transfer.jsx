import { useState } from "react";
import server from "./server";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { secp256k1 } from "ethereum-cryptography/secp256k1";

function Transfer({ address, addresses, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const hashMessage = (message) => {
    const bytes = utf8ToBytes(JSON.stringify(message));
    return keccak256(bytes);
  };

  async function transfer(evt) {
    evt.preventDefault();

    const sender = addresses.filter((item) => item.walletAddress === address);
    const sender_public_key = sender[0].publicKey;
    const sender_private_key = sender[0].privateKey;

    const message = {
      sender: sender_public_key,
      amount: parseInt(sendAmount),
      recipient,
    };

    const signature = secp256k1.sign(hashMessage(message), sender_private_key);
    signature.addRecoveryBit(1);

    try {
      const data = await server.post("/send", {
        signature: signature.toCompactHex(),
        message,
      });
      setBalance('Pls updated');
    } catch (ex) {
      console.error(ex);
    }
  }

  return (
    <form className="container flex" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
