import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { useState } from "react";

export default function Address({ addresses, setAddresses }) {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const onSubmit = () => {
    const tmp_private_key = secp256k1.utils.randomPrivateKey();
    const tmp_public_key = secp256k1.getPublicKey(tmp_private_key);
    const tmp_wallet_address = keccak256(tmp_public_key.slice(1)).slice(-20);

    setPrivateKey(toHex(tmp_private_key));
    setPublicKey(toHex(tmp_public_key));

    setWalletAddress(toHex(tmp_wallet_address));

    setAddresses([
      ...addresses,
      {
        privateKey,
        publicKey,
        walletAddress,
      },
    ]);
  };

  return (
    <div className="container flex">
      <h1>Generate Address</h1>

      <label htmlFor="public">
        Public Key
        <input type="text" id="public" value={publicKey} readOnly />
      </label>

      <label htmlFor="private">
        Private Key
        <input type="text" id="private" value={privateKey} readOnly />
      </label>

      <input
        type="submit"
        className="button"
        value="Generate"
        onClick={onSubmit}
      />
    </div>
  );
}
