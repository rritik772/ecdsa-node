const GeneratedAddress = ({ addresses }) => {
  return (
    <div className="container">
      <h1>Generated Address</h1>

      {addresses.map((address, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          <pre title="Public Key">{address.publicKey}</pre>
          <pre title="Private Key">{address.privateKey}</pre>
          <pre title="Wallet Address">{address.walletAddress}</pre>
        </div>
      ))}
    </div>
  );
};

export default GeneratedAddress;
