// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SupplyChainLogistics {
    enum DeliveryStatus {
        Registered,
        InTransit,
        AtWarehouse,
        OutForDelivery,
        Delivered,
        Cancelled
    }

    struct Product {
        string productId;
        string name;
        string metadataURI;
        bytes32 fingerprint;
        bool exists;
        address registeredBy;
        address currentOwner;
        DeliveryStatus status;
        uint256 createdAt;
    }

    struct LocationUpdate {
        string location;
        uint256 timestamp;
        address updatedBy;
    }

    struct OwnershipUpdate {
        address from;
        address to;
        uint256 timestamp;
        string note;
    }

    struct StatusUpdate {
        DeliveryStatus status;
        uint256 timestamp;
        address updatedBy;
        string note;
    }

    mapping(string => Product) private products;
    mapping(string => LocationUpdate[]) private locationHistory;
    mapping(string => OwnershipUpdate[]) private ownershipHistory;
    mapping(string => StatusUpdate[]) private statusHistory;
    string[] private allProductIds;

    event ProductRegistered(
        string indexed productId,
        string name,
        address indexed manufacturer,
        bytes32 fingerprint,
        uint256 timestamp
    );
    event LocationUpdated(
        string indexed productId,
        string location,
        address indexed updatedBy,
        uint256 timestamp
    );
    event DeliveryStatusUpdated(
        string indexed productId,
        DeliveryStatus status,
        address indexed updatedBy,
        string note,
        uint256 timestamp
    );
    event OwnershipTransferred(
        string indexed productId,
        address indexed previousOwner,
        address indexed newOwner,
        string note,
        uint256 timestamp
    );

    modifier onlyExistingProduct(string memory productId) {
        require(products[productId].exists, "Product does not exist");
        _;
    }

    modifier onlyCurrentOwner(string memory productId) {
        require(
            products[productId].currentOwner == msg.sender,
            "Only current owner can perform this action"
        );
        _;
    }

    function registerProduct(
        string memory productId,
        string memory name,
        string memory metadataURI
    ) external {
        require(bytes(productId).length > 0, "Product ID is required");
        require(bytes(name).length > 0, "Product name is required");
        require(!products[productId].exists, "Product already exists");

        bytes32 fingerprint = keccak256(
            abi.encode(productId, name, metadataURI, msg.sender, block.timestamp)
        );

        products[productId] = Product({
            productId: productId,
            name: name,
            metadataURI: metadataURI,
            fingerprint: fingerprint,
            exists: true,
            registeredBy: msg.sender,
            currentOwner: msg.sender,
            status: DeliveryStatus.Registered,
            createdAt: block.timestamp
        });

        allProductIds.push(productId);

        ownershipHistory[productId].push(
            OwnershipUpdate({
                from: address(0),
                to: msg.sender,
                timestamp: block.timestamp,
                note: "Initial registration"
            })
        );

        statusHistory[productId].push(
            StatusUpdate({
                status: DeliveryStatus.Registered,
                timestamp: block.timestamp,
                updatedBy: msg.sender,
                note: "Product created"
            })
        );

        emit ProductRegistered(productId, name, msg.sender, fingerprint, block.timestamp);
    }

    function updateLocation(
        string memory productId,
        string memory location
    ) external onlyExistingProduct(productId) onlyCurrentOwner(productId) {
        require(bytes(location).length > 0, "Location is required");

        locationHistory[productId].push(
            LocationUpdate({
                location: location,
                timestamp: block.timestamp,
                updatedBy: msg.sender
            })
        );

        emit LocationUpdated(productId, location, msg.sender, block.timestamp);
    }

    function updateDeliveryStatus(
        string memory productId,
        DeliveryStatus newStatus,
        string memory note
    ) external onlyExistingProduct(productId) onlyCurrentOwner(productId) {
        products[productId].status = newStatus;

        statusHistory[productId].push(
            StatusUpdate({
                status: newStatus,
                timestamp: block.timestamp,
                updatedBy: msg.sender,
                note: note
            })
        );

        emit DeliveryStatusUpdated(
            productId,
            newStatus,
            msg.sender,
            note,
            block.timestamp
        );
    }

    function checkAuthenticity(
        string memory productId,
        bytes32 expectedHash
    ) external view onlyExistingProduct(productId) returns (bool) {
        return products[productId].fingerprint == expectedHash;
    }

    function transferProductOwnership(
        string memory productId,
        address newOwner,
        string memory note
    ) external onlyExistingProduct(productId) onlyCurrentOwner(productId) {
        require(newOwner != address(0), "New owner cannot be zero address");
        require(newOwner != msg.sender, "New owner must be different");

        address previousOwner = products[productId].currentOwner;
        products[productId].currentOwner = newOwner;

        ownershipHistory[productId].push(
            OwnershipUpdate({
                from: previousOwner,
                to: newOwner,
                timestamp: block.timestamp,
                note: note
            })
        );

        emit OwnershipTransferred(
            productId,
            previousOwner,
            newOwner,
            note,
            block.timestamp
        );
    }

    function getProduct(
        string memory productId
    ) external view onlyExistingProduct(productId) returns (Product memory) {
        return products[productId];
    }

    function getLocationHistory(
        string memory productId
    ) external view onlyExistingProduct(productId) returns (LocationUpdate[] memory) {
        return locationHistory[productId];
    }

    function getOwnershipHistory(
        string memory productId
    ) external view onlyExistingProduct(productId) returns (OwnershipUpdate[] memory) {
        return ownershipHistory[productId];
    }

    function getStatusHistory(
        string memory productId
    ) external view onlyExistingProduct(productId) returns (StatusUpdate[] memory) {
        return statusHistory[productId];
    }

    function getAllProductIds() external view returns (string[] memory) {
        return allProductIds;
    }

    function auditSupplyChain(
        string memory productId
    )
        external
        view
        onlyExistingProduct(productId)
        returns (
            Product memory product,
            LocationUpdate[] memory locations,
            OwnershipUpdate[] memory ownerships,
            StatusUpdate[] memory statuses
        )
    {
        product = products[productId];
        locations = locationHistory[productId];
        ownerships = ownershipHistory[productId];
        statuses = statusHistory[productId];
    }
}

