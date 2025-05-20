async function main() {
  const Secim = await ethers.getContractFactory("Secim");

  const voters = [
    "0x124b84D5290AF0066446d27Ff1324C252B06E5DB", // Adres 1
    "0x51E09e38df74E273f6F4C8120FE49Fd95324cc19", // Adres 2
    "0x9E6986F40da6039077C629b785480Dbe6004439A", // Adres 3
    "0x39C0025c2f3E0B27A2D1b18c330E08A229530Cb4", // Adres 4
    "0x9929BCa7b932495434eE9b50aB15c6478D26B20f", // Adres 5
  ];

  const secim = await Secim.deploy(voters);
  console.log("Secim deployed to:", secim.target); 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
