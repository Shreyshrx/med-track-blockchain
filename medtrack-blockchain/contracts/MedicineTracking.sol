
// SPDX-License-Identifier: MIT

 pragma solidity ^0.8.20;

contract MedicineTracking {

    struct Medicine {
        string batchId;
        string name;
        string manufacturer;
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
            _expiryDate,
            msg.sender
        );
    }

    function transferMedicine(string memory _batchId, address _newOwner) public {

        require(medicines[_batchId].currentOwner == msg.sender, "Not owner");

        medicines[_batchId].currentOwner = _newOwner;
    }

    function getMedicine(string memory _batchId) public view returns (
        string memory,
        string memory,
        string memory,
        uint,
        address
    ) {

        Medicine memory m = medicines[_batchId];

        return (
            m.batchId,
            m.name,
            m.manufacturer,
            m.expiryDate,
            m.currentOwner
        );
    }
}