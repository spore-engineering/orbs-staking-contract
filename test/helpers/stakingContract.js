const TruffleStakingContract = artifacts.require('../../contracts/StakingContract.sol');

class StakingContract {
  constructor(cooldownPeriod, migrationManager, emergencyManager, token) {
    this.cooldownPeriod = cooldownPeriod;
    this.migrationManager = migrationManager;
    this.emergencyManager = emergencyManager;
    this.token = token;
  }

  static async new(cooldownPeriod, migrationManager, emergencyManager, token) {
    const staking = new StakingContract(cooldownPeriod, migrationManager, emergencyManager, token);
    await staking.deploy();

    return staking;
  }

  async deploy() {
    this.staking = await TruffleStakingContract.new(this.cooldownPeriod, this.migrationManager, this.emergencyManager,
      this.token);
  }

  getAddress() {
    return this.staking.address;
  }

  async getVersion() {
    return this.staking.VERSION.call();
  }

  async getCooldownPeriod() {
    return this.staking.cooldownPeriod.call();
  }

  async getMigrationManager() {
    return this.staking.migrationManager.call();
  }

  async getEmergencyManager() {
    return this.staking.emergencyManager.call();
  }

  async getToken() {
    return this.staking.token.call();
  }
}

export default StakingContract;
