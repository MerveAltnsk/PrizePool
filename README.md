# 🏆 PrizePool dApp

A lightweight, modern decentralized application for creating and distributing competition prize pools via the Stellar Soroban blockchain.

---

## 📜 Contract ID

**ContractID:** `YOUR_CONTRACT_ID_HERE`  
> Replace with your actual deployed contract ID on Stellar Testnet.

---

## 📘 Project Overview

**PrizePool** is a decentralized application (dApp) designed to manage prize distributions for various competitions such as software development, design, or art contests. Built using the Stellar Soroban platform, this application allows users to create a prize pool and automatically distribute the prize (in XLM) to the winner once the contest concludes.

---

## 🚀 Project Goals

- Build a clean and modern frontend using **Next.js**, **Tailwind CSS**, and **TypeScript**.
- Develop a minimalistic smart contract with 2–4 basic functions using **Rust** and the **Soroban SDK**.
- Integrate Freighter Wallet for seamless connect/disconnect and transaction signing.
- Deploy the contract on the **Stellar Testnet** and connect it to the frontend.

---

## 🧩 Key Features

### ✅ Frontend
- Minimal and user-friendly UI
- Built with **Next.js** + **TailwindCSS**
- No complex folder structures
- Shows contract results dynamically

### ✅ Smart Contract
- Developed in **Rust** with **Soroban SDK**
- Contains **maximum 3–4 functions**
- Handles basic read/write blockchain operations
- Supports minimal on-chain data storage
- Designed to be easily testable

### ✅ Wallet Integration
- Uses **Freighter Wallet API**
- Connect and disconnect wallet functionality
- Transaction signing enabled
- Fully testable using Freighter’s testnet setup

---

## ❌ Out of Scope

This project **intentionally avoids** complexity:
- ❌ No advanced business logic
- ❌ No multi-token or access control systems
- ❌ No multi-signature or time-locked functions
- ❌ No frontend state management libraries
- ❌ No gas/fee calculation logic

---

## 🔧 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | Next.js, Tailwind CSS, TypeScript |
| Contract  | Rust + Soroban SDK      |
| Wallet    | Freighter Wallet API    |
| Network   | Stellar Testnet         |

---

## 🧪 Test Scenarios

- ✅ Smart contract deploys successfully
- ✅ Freighter wallet connects/disconnects
- ✅ Contract functions are callable from frontend
- ✅ Results are returned and rendered correctly
- ✅ UI operates as intended

---

## 🧠 Development Steps

### Contract Development
- Create a basic Soroban contract with 3–4 functions
- Deploy it on the Stellar testnet
- Verify its correct operation through test calls

### Frontend Integration
- Integrate contract functions using JavaScript
- Ensure the frontend is clean and functional
- Connect to Freighter Wallet using its API

---

## ✅ Success Criteria

- Contract successfully deployed on Stellar Testnet
- Fully functional connection with Freighter Wallet
- 3–4 basic contract functions working properly
- Frontend and contract operate smoothly together

---

## 📝 License

This project is for educational/workshop purposes and is not intended for production use.

---

## 📬 Contact

For questions, feel free to reach out to the maintainer.

