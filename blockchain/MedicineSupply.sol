
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineSupply {

    struct Medicine {
        string batchId;
        string name;
        string manufacturer;
        uint manufactureDate;
        uint expiryDate;
        address currentOwner;
    }

    mapping(string => Medicine) public medicines;

    function createBatch(
        string memory _batchId,
        string memory _name,
        string memory _manufacturer,
        uint _expiryDate
    ) public {

        medicines[_batchId] = Medicine(
            _batchId,
            _name,
            _manufacturer,
            block.timestamp,
            _expiryDate,
            msg.sender
        );
    }

    function transferOwnership(string memory _batchId, address newOwner) public {
        medicines[_batchId].currentOwner = newOwner;
    }

    function verifyMedicine(string memory _batchId) public view returns (
        string memory,
        string memory,
        string memory,
        uint,
        uint,
        address
    ) {
        Medicine memory m = medicines[_batchId];
        return (
            m.batchId,
            m.name,
            m.manufacturer,
            m.manufactureDate,
            m.expiryDate,
            m.currentOwner
        );
    }
}
