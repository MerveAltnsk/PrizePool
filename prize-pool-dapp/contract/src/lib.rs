#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String};

#[contract]
pub struct PrizePool;

#[contractimpl]
impl PrizePool {
    pub fn initialize(env: Env, admin: Address) {
        env.storage().persistent().set("admin", &admin);
        env.storage().persistent().set("total_pool", &0_i128);
        env.storage()
            .persistent()
            .set("status", &String::from_str(&env, "active"));
    }

    pub fn contribute(env: Env, from: Address, amount: i128) {
        let status: String = env.storage().persistent().get("status").unwrap();
        if status != String::from_str(&env, "active") {
            panic!("Contest has ended");
        }
        let current_pool: i128 = env.storage().persistent().get("total_pool").unwrap();
        env.storage()
            .persistent()
            .set("total_pool", &(current_pool + amount));
    }

    pub fn get_total_pool(env: Env) -> i128 {
        env.storage().persistent().get("total_pool").unwrap_or(0)
    }

    pub fn set_winner(env: Env, caller: Address, winner: Address) {
        let admin: Address = env.storage().persistent().get("admin").unwrap();
        if caller != admin {
            panic!("Only admin can set winner");
        }
        env.storage().persistent().set("winner", &winner);
        env.storage()
            .persistent()
            .set("status", &String::from_str(&env, "ended"));
    }

    pub fn distribute_prize(env: Env, caller: Address) {
        let admin: Address = env.storage().persistent().get("admin").unwrap();
        if caller != admin {
            panic!("Only admin can distribute prize");
        }
        let status: String = env.storage().persistent().get("status").unwrap();
        if status != String::from_str(&env, "ended") {
            panic!("Contest must be ended to distribute prize");
        }
        let winner: Address = env.storage().persistent().get("winner").unwrap();
        let total_pool: i128 = env.storage().persistent().get("total_pool").unwrap();
        env.storage().persistent().set("total_pool", &0_i128);
    }

    pub fn get_contest_status(env: Env) -> String {
        env.storage()
            .persistent()
            .get("status")
            .unwrap_or(String::from_str(&env, "active"))
    }
}
