const { expect } = require("chai");

describe("ConfidentialVoting", () => {
  let voting, owner;

  beforeEach(async () => {
    const Voting = await ethers.getContractFactory("ConfidentialVoting");
    voting = await Voting.deploy();
    [owner] = await ethers.getSigners();
  });

  it("should allow submitting encrypted vote", async () => {
    const fakeCipher = "0x1234abcd";

    await voting.submitEncryptedVote(1, fakeCipher);

    const vote = await voting.proposalVotes(1, owner.address);
    expect(vote.exists).to.equal(true);
    expect(vote.ciphertext).to.equal(fakeCipher);
  });
});
