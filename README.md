# Dosyalar Master Dalında

# secim-contract dosyası
- cd secim-contract
- npm install 

# test işlemi
- cd secim-contract
- npx hardhat test



# kontratı deploy etmek için
- npx hardhat compile
- npx hardhat run scripts/deploy.js --network sepolia


# frontend için
- cd secim-react
- npm install
- npm start


// Matemask Seed 0x761448ee7ef9c5545bad86d4fcbf147cc25ecf1a2c9e0f349b6e39c1d656c2f0

// Sepolia Endpoint https://sepolia.infura.io/v3/c1528d46bf234ff6a4058c2024b48471

// Adres 1 ebdca3085b677490512e0078a35b8c93f5e8292845bfcab2f1aca03621c2e4f6
// Adres 2 9306d80bd760d72ca02271c13943de5d8fdf9fec900f490e56905f158cca896b
// Adres 3 1ffb06e83564f8b55d4c496c44a53959b720026c482358c3e71d373e6a3b9f82
// Adres 4 c5f83da427af5e8035a58df701c820fbfbef3cad58cd08b309a2e03ba8a0e07f
// Adres 5 5850b7982ccf3a437898037c17985b5806110b7b30d5574bd7acf798dc4781ca


// AdresPriv 1 0x124b84D5290AF0066446d27Ff1324C252B06E5DB // 0x6a7967af3cb5efdcc636e853f4ccb43a3132cf600666dae1a6267ad3f7458d2c // Hesap 8 // Gönderildi
// AdresPriv 2 0x51E09e38df74E273f6F4C8120FE49Fd95324cc19 // 0x963aa74f33b05b7da247b0801ea20bcec2e17fd8d56026d499e28c1db7b9669a // Hesap 4 // Gönderildi
// AdresPriv 3 0x9E6986F40da6039077C629b785480Dbe6004439A // 0x5962a949f0cffde1f3d3433153221ffcefc6ba171ed39fb1b0ff125f26af9cdd // Hesap 5 // Gönderildi
// AdresPriv 4 0x39C0025c2f3E0B27A2D1b18c330E08A229530Cb4 // 0xc56852556cccd61d4a26db8df88e0c367ee4468bd9bc46bdab9d286cc9385bf3 // Hesap 6 // Gönderildi
// AdresPriv 5 0x9929BCa7b932495434eE9b50aB15c6478D26B20f // 0x1b6f67474a8d4d9ad9f52514e7d0460f46ffbd894e8891e4e8a4a23c4093fc18 // Hesap 7 // Gönderildi


scripts/deploy.js dosyasında:

const voters = [
  "0x124b84D5290AF0066446d27Ff1324C252B06E5DB",
  "0x51E09e38df74E273f6F4C8120FE49Fd95324cc19",
  "0x9E6986F40da6039077C629b785480Dbe6004439A",
  "0x39C0025c2f3E0B27A2D1b18c330E08A229530Cb4",
  "0x9929BCa7b932495434eE9b50aB15c6478D26B20f"
];
