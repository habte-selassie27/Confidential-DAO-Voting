// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title FHE Precompile Interface
/// @notice Matches the expected Zama FHE add() ABI
interface IFHEPrecompile {
    function add(bytes calldata a, bytes calldata b) external view returns (bytes memory);
}

contract TallyEncryption {
    /// @notice FHE public key provided by frontend (placeholder for now)
    bytes public fhePublicKey;

    /// @notice Hardcoded Zama FHE add precompile address
    address constant FHE_ADD_PRECOMPILE = 0x0000000000000000000000000000000000000055;

    constructor() {
        fhePublicKey = "FHE_PUBLIC_KEY_PLACEHOLDER";
    }

    /// @notice Allows admin to update the FHE public key
    function setFHEPublicKey(bytes calldata newKey) external {
        fhePublicKey = newKey;
    }

    /// @notice Internal helper to call the Zama FHE add precompile
    function fheAddCiphertexts(bytes memory a, bytes memory b)
        internal
        view
        returns (bytes memory)
    {
        return IFHEPrecompile(FHE_ADD_PRECOMPILE).add(a, b);
    }
}
