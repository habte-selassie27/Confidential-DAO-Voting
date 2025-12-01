// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProposalManager {
    struct Proposal {
        uint256 id;
        string title;
        string description;
        address creator;
        uint256 createdAt;
        bool active;
    }

    uint256 public proposalCounter;
    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 id, string title, address creator);
    event ProposalClosed(uint256 id);

    function createProposal(string memory title, string memory description) external {
        proposalCounter++;

        proposals[proposalCounter] = Proposal({
            id: proposalCounter,
            title: title,
            description: description,
            creator: msg.sender,
            createdAt: block.timestamp,
            active: true
        });

        emit ProposalCreated(proposalCounter, title, msg.sender);
    }

    function closeProposal(uint256 proposalId) external {
        require(proposals[proposalId].creator == msg.sender, "Not creator");
        require(proposals[proposalId].active, "Already closed");

        proposals[proposalId].active = false;
        emit ProposalClosed(proposalId);
    }
}
