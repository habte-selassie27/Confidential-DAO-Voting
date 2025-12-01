const { expect } = require("chai");

describe("ProposalManager", () => {
  let manager, owner;

  beforeEach(async () => {
    const PM = await ethers.getContractFactory("ProposalManager");
    manager = await PM.deploy();
    [owner] = await ethers.getSigners();
  });

  it("creates a proposal", async () => {
    await manager.createProposal("Test A", "Desc");

    const proposal = await manager.proposals(1);
    expect(proposal.title).to.equal("Test A");
    expect(proposal.active).to.equal(true);
  });
});
