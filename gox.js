const { ethers } = require("ethers");

const ALCHEMY_API_KEY_URL="https://speedy-nodes-nyc.moralis.io/81b0a6155f9a7a74e1650031/eth/mainnet"

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_KEY_URL);
//const addressReceiver = "0xdd2f13bCE3F6ccb285162Aa3722B37608b9cbEE0"; //springtest3
const addressReceiver = "0x12a6Eb011212100ae0e356D3d5cA8F438e36E581"; //spring test account2

const privateKeys =
["0xb2af4a0a5ee43312b04ce0ba0a18ce2de533247239d3dc5ed556766b9f36bd15",
"0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
"0x964744cae3d17cc381201426534d77d099a80588fec48ef2e4f6ea563c43f2a2",
"0x000000000000000000000000000000000000000000000000000000000000001a",
"0x9b3618ed9578ae72594ff1d78eee200565b9aba307b54bfb87bb89d27497d9ab",
"0x07599aecfc6a736f14481809b10c2a7cfc8141c12ccc9e6f3fa159fba1768933",
"0xb7311869888449305ebd3801e9101601b6cb737c303208926a6b0efdfcf9ce75",
"0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
"0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
"0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
"0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
];

const bot = async () => {
    provider.on("block", async (blockNumber) => {
      console.log("New block minted: " + blockNumber);
      for (let i = 0; i < privateKeys.length; i++) {
        const _target = new ethers.Wallet(privateKeys[i]);
        const target = _target.connect(provider);
        const balance = await provider.getBalance(target.address);
        const txBuffer = ethers.utils.parseEther(".0002");    //leave enought for gas fee
        if (balance.sub(txBuffer) > 0) {
          console.log("NEW ACCOUNT WITH ETH!");
          const amount = balance.sub(txBuffer);
          try {
            await target.sendTransaction({
              to: addressReceiver,
              value: amount
            });
            console.log(`Success! transfered --> ${ethers.utils.formatEther(balance)}`);
          }
          catch (e) {
              console.log(`error: ${e}`);
          }
        }
      }
      console.log("Listening new block, waiting...");
    });
  }
  
  bot();
