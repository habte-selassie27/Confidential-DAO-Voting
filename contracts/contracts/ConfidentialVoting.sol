// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TallyEncryption.sol";

contract ConfidentialVoting is TallyEncryption {
    struct EncryptedVote {
        bool exists;
        bytes ciphertext;
    }

    mapping(uint256 => mapping(address => EncryptedVote)) public proposalVotes;
    mapping(uint256 => bytes) public encryptedTallies;

    event VoteSubmitted(uint256 proposalId, address voter);
    event TallyUpdated(uint256 proposalId, bytes newTally);

    function submitEncryptedVote(uint256 proposalId, bytes calldata ciphertext) external {
        require(!proposalVotes[proposalId][msg.sender].exists, "Already voted");

        proposalVotes[proposalId][msg.sender] = EncryptedVote({
            exists: true,
            ciphertext: ciphertext
        });

        bytes memory updated = fheAddCiphertexts(encryptedTallies[proposalId], ciphertext);
        encryptedTallies[proposalId] = updated;

        emit VoteSubmitted(proposalId, msg.sender);
        emit TallyUpdated(proposalId, updated);
    }

    function getEncryptedTally(uint256 proposalId) external view returns (bytes memory) {
        return encryptedTallies[proposalId];
    }
}
