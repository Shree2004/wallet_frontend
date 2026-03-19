import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Wallet() {
  const [balance, setBalance] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch balance
  const getBalance = async () => {
    try {
      const res = await fetch("http://localhost:8080/wallet/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setBalance(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching balance");
    }
  };

  // 🔹 Fetch transactions
  const getTransactions = async () => {
    try {
      const res = await fetch("http://localhost:8080/wallet/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Deposit
  const deposit = async () => {
    try {
      const res = await fetch("http://localhost:8080/wallet/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(depositAmount),
        }),
      });

      if (!res.ok) {
        alert(await res.text());
        return;
      }

      alert("Deposited successfully ✅");
      setDepositAmount("");
      getBalance();
      getTransactions();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // 🔹 Withdraw
  const withdraw = async () => {
    try {
      const res = await fetch("http://localhost:8080/wallet/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(withdrawAmount),
        }),
      });

      if (!res.ok) {
        alert(await res.text());
        return;
      }

      alert("Withdraw successful 💸");
      setWithdrawAmount("");
      getBalance();
      getTransactions();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // 🔹 Transfer
  const transfer = async () => {
    try {
      const res = await fetch("http://localhost:8080/wallet/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: Number(receiverId),
          amount: Number(transferAmount),
        }),
      });

      if (!res.ok) {
        alert(await res.text());
        return;
      }

      alert("Transfer successful 💸");
      setReceiverId("");
      setTransferAmount("");
      getBalance();
      getTransactions();

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getBalance();
    getTransactions();
  }, []);

  return (
    <div className="container">
      <h1>Wallet Dashboard</h1>

      {/* Balance */}
      <div className="balance-card">
        <p>Current Balance</p>
        <h2>₹ {balance}</h2>
      </div>

      {/* Actions */}
      <div className="grid">
        {/* Deposit */}
        <div className="card">
          <h3>Deposit</h3>
          <input
            type="number"
            placeholder="Enter amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <button className="deposit-btn" onClick={deposit}>
            Deposit
          </button>
        </div>

        {/* Withdraw */}
        <div className="card">
          <h3>Withdraw</h3>
          <input
            type="number"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button className="withdraw-btn" onClick={withdraw}>
            Withdraw
          </button>
        </div>

        {/* Transfer */}
        <div className="card">
          <h3>Transfer</h3>

          <input
            type="number"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            value={transferAmount}
            onChange={(e) => setTransferAmount(e.target.value)}
          />

          <button className="transfer-btn" onClick={transfer}>
            Transfer
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h3>Transaction History</h3>

        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ddd",
                color:
                  tx.type === "DEPOSIT"
                    ? "green"
                    : tx.type === "WITHDRAW"
                    ? "red"
                    : "blue",
              }}
            >
              <strong>{tx.type}</strong> ₹{tx.amount}
              <br />
              <small>
                {tx.sender} → {tx.receiver}
              </small>
            </div>
          ))
        )}
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Wallet;