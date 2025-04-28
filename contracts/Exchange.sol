// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITRC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract Exchange {
    ITRC20 public uuuuToken;
    address public admin;
    address public trxReceiver;  // TRX收款地址
    uint256 public constant MIN_TRX_AMOUNT = 20_000_000; // 20 TRX in sun
    uint256 public constant EXCHANGE_RATE_DENOMINATOR = 20_000_000; // 20 TRX = 1 UUUU in sun

    event ExchangeCompleted(
        address indexed user,
        uint256 trxAmount,
        uint256 truAmount
    );

    constructor(address _truToken, address _trxReceiver) {
        uuuuToken = ITRC20(_truToken);
        admin = msg.sender;
        trxReceiver = _trxReceiver;
    }

    // 用户发送TRX兑换TRU
    function exchangeTRXForTRU() external payable {
        require(msg.value > 0, "Must send TRX");
        require(msg.value >= MIN_TRX_AMOUNT, "Minimum 20 TRX required"); // 20 TRX = 20_000_000 sun
        
        // 计算UUUU数量：TRX数量 * 10^8 / 20_000_000
        uint256 uuuuAmount = (msg.value * 10**8) / EXCHANGE_RATE_DENOMINATOR;
        require(uuuuToken.balanceOf(address(this)) >= uuuuAmount, "Insufficient UUUU balance");

        // 立即转发TRX到接收地址
        payable(trxReceiver).transfer(msg.value);

        // 转账UUUU给用户
        require(uuuuToken.transfer(msg.sender, uuuuAmount), "UUUU transfer failed");

        emit ExchangeCompleted(msg.sender, msg.value, uuuuAmount);
    }

    // 管理员可以更新TRX接收地址
    function setTRXReceiver(address _trxReceiver) external {
        require(msg.sender == admin, "Only admin");
        require(_trxReceiver != address(0), "Invalid address");
        trxReceiver = _trxReceiver;
    }

    // 管理员可以提取合约中的UUUU
    function withdrawUUUU(uint256 amount) external {
        require(msg.sender == admin, "Only admin");
        require(uuuuToken.transfer(admin, amount), "UUUU transfer failed");
    }

    // 返回当前汇率：多少TRX兑换1UUUU
    function getExchangeRate() external pure returns (uint256) {
        return EXCHANGE_RATE_DENOMINATOR / 1_000_000; // 转换为TRX单位
    }

    // 紧急情况：如果有TRX卡在合约里，管理员可以提取
    function emergencyWithdrawTRX() external {
        require(msg.sender == admin, "Only admin");
        payable(trxReceiver).transfer(address(this).balance);
    }
}
