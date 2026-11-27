// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title BatchTransactor
 * @dev Helper contract to generate deterministic multi-account transactions in Ganache test environments.
 */
contract BatchTransactor {
    address public owner;
    uint256 public executionCount;

    event BatchExecuted(uint256 indexed batchId, uint256 count, uint256 totalValue);
    event ValueTransferred(address indexed from, address indexed to, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {}

    function sendBatch(address[] calldata recipients, uint256[] calldata amounts) external payable {
        require(recipients.length == amounts.length, "Mismatched arrays");
        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        require(msg.value >= total, "Insufficient ETH sent for batch");

        executionCount++;
        for (uint256 i = 0; i < recipients.length; i++) {
            (bool success, ) = payable(recipients[i]).call{value: amounts[i]}("");
            require(success, "Transfer failed");
            emit ValueTransferred(msg.sender, recipients[i], amounts[i]);
        }

        emit BatchExecuted(executionCount, recipients.length, total);
    }
}
