const StakingContractWrapper = artifacts.require('../../contracts/tests/StakingContractWrapper.sol');

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
    this.staking = await StakingContractWrapper.new(this.cooldownPeriod,
      StakingContract.getAddress(this.migrationManager), StakingContract.getAddress(this.emergencyManager),
      StakingContract.getAddress(this.token));
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

  async getStakeChangeNotifier() {
    return this.staking.notifier.call();
  }

  async setMigrationManager(manager, options = {}) {
    return this.staking.setMigrationManager(StakingContract.getAddress(manager), options);
  }

  async setEmergencyManager(manager, options = {}) {
    return this.staking.setEmergencyManager(StakingContract.getAddress(manager), options);
  }

  async setStakeChangeNotifier(notifier, options = {}) {
    return this.staking.setStakeChangeNotifier(StakingContract.getAddress(notifier), options);
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

  async notifyStakeChange(stakeOwner) {
    return this.staking.notify(stakeOwner);
  }

  static getAddress(obj) {
    return obj instanceof Object ? obj.address : obj;
  }
}

export default StakingContract;
