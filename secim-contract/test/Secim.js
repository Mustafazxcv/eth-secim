const { expect } = require("chai");

describe("Secim", function () {
  let Secim, secim, owner, voter1, voter2, voter3, voter4, voter5, other;

  beforeEach(async () => {
    [owner, voter1, voter2, voter3, voter4, voter5, other] = await ethers.getSigners();
    const voters = [
      voter1.address,
      voter2.address,
      voter3.address,
      voter4.address,
      voter5.address
    ];
    Secim = await ethers.getContractFactory("Secim");
    secim = await Secim.deploy(voters);
    await secim.waitForDeployment();
  });

  it("1. Sözleşme deploy edilebiliyor mu?", async function () {
    expect(secim.target).to.not.be.undefined;
  });

  it("2. Seçmen oy kullanabiliyor mu?", async function () {
    await secim.connect(voter1).vote(1);
    const votes1 = await secim.candidate1Votes();
    expect(Number(votes1)).to.equal(1); 
  });

  it("3. Seçmen olmayan biri oy kullanamiyor", async function () {
    await expect(secim.connect(other).vote(1)).to.be.revertedWith("Bu adrese oy hakki tanimli degil");
  });

  it("4. Aynı seçmen tekrar oy kullanamıyor", async function () {
    await secim.connect(voter1).vote(1);
    await expect(secim.connect(voter1).vote(2)).to.be.revertedWith("Daha once oy kullanildi");
  });

  it("5. Oy verme sayaçları güncelleniyor mu?", async function () {
    await secim.connect(voter1).vote(1);
    let votes1 = await secim.candidate1Votes();
    expect(Number(votes1)).to.equal(1);

    await secim.connect(voter2).vote(2);
    let votes2 = await secim.candidate2Votes();
    expect(Number(votes2)).to.equal(1);
  });

  it("6. Aynı adaya iki seçmen oy verirse sayaç 2 oluyor mu?", async function () {
    await secim.connect(voter1).vote(1);
    await secim.connect(voter2).vote(1);
    const votes1 = await secim.candidate1Votes();
    expect(Number(votes1)).to.equal(2);
  });

  it("7. Owner dışında biri oylamayı sonlandıramıyor", async function () {
    await expect(secim.connect(voter1).endVoting()).to.be.revertedWith("Sadece sahibi bitirebilir");
  });

  it("8. Oylama bittikten sonra oy kullanılamıyor", async function () {
    await secim.connect(owner).endVoting();
    await expect(secim.connect(voter3).vote(1)).to.be.revertedWith("Oylama bitti");
  });
});
