import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SecimABI from "./contracts/SecimABI.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [votes, setVotes] = useState([0, 0]);
  const [votingActive, setVotingActive] = useState(true);
  const [owner, setOwner] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      const secimContract = new ethers.Contract(CONTRACT_ADDRESS, SecimABI, signer);
      setContract(secimContract);

      const ownerAddr = await secimContract.owner();
      setOwner(ownerAddr);
      setIsOwner(accounts[0].toLowerCase() === ownerAddr.toLowerCase());

      const votingActive = await secimContract.votingActive();
      setVotingActive(votingActive);

      const votesData = await secimContract.getVotes();
      setVotes([Number(votesData[0]), Number(votesData[1])]);
    } else {
      alert("Metamask gerekli!");
    }
  };

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line
  }, []);

  const vote = async (candidate) => {
    if (!contract) return;
    try {
      const tx = await contract.vote(candidate);
      await tx.wait();
      alert("Oy verdiniz!");
      connectWallet();
    } catch (e) {
      alert("Oy verme hatası: " + (e.data?.message || e.message));
    }
  };

  const refreshVotes = async () => {
    if (contract) {
      const votesData = await contract.getVotes();
      setVotes([Number(votesData[0]), Number(votesData[1])]);
    }
  };

  const endVoting = async () => {
    if (!contract) return;
    try {
      const tx = await contract.endVoting();
      await tx.wait();
      alert("Oylama sonlandırıldı!");
      setVotingActive(false);
    } catch (e) {
      alert("Sonlandırma hatası: " + (e.data?.message || e.message));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 40 }}>
      <h1>Online Seçim Dapp (Sepolia)</h1>
      <p>Bağlı hesap: <b>{account}</b></p>
      <div style={{ display: "flex", justifyContent: "space-around", margin: "40px 0" }}>
        <div style={{ textAlign: "center" }}>
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Aday 1" width={100} />
          <h2>Aday 1</h2>
          <button disabled={!votingActive} onClick={() => vote(1)}>Oy Ver</button>
          <div>Oy: {votes[0]}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Aday 2" width={100} />
          <h2>Aday 2</h2>
          <button disabled={!votingActive} onClick={() => vote(2)}>Oy Ver</button>
          <div>Oy: {votes[1]}</div>
        </div>
      </div>
      <button onClick={refreshVotes}>Sonuçları Güncelle</button>
      {isOwner && votingActive && (
        <div style={{ marginTop: 20 }}>
          <button onClick={endVoting}>Oylamayı Sonlandır</button>
        </div>
      )}
      {!votingActive && <div style={{ marginTop: 30, color: "red" }}>Oylama sona erdi. Oy verilemez!</div>}
    </div>
  );
}

export default App;
