const { ethers } = require("ethers");

const ALCHEMY_API_KEY_URL="https://speedy-nodes-nyc.moralis.io/81b0a6155f9a7a74e1650031/bsc/mainnet"

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_KEY_URL);
//const addressReceiver = "0xdd2f13bCE3F6ccb285162Aa3722B37608b9cbEE0"; //springtest3
const addressReceiver = "0x12a6Eb011212100ae0e356D3d5cA8F438e36E581"; //spring test account2

const privateKeys =
["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
"0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
"0x000000000000000000000000000000000000000000000000000000000000001a",
"0x3aeaf26d83cf9a24a9569d2e013fddb2bd78a002cffc60d9451571b7ca90609c",
"0x55ed86cc72c81b0024a455335a4f5f9a1a541a775487d46a3e889c849bd3fa62",
"0x9b3618ed9578ae72594ff1d78eee200565b9aba307b54bfb87bb89d27497d9ab",
"0x07599aecfc6a736f14481809b10c2a7cfc8141c12ccc9e6f3fa159fba1768933",
"0xdab5cf07e80498f0dd7637a3c619afbfd5fe6720372072584688b6dd6b2b8c2b",
"0x0ccbf0ff21887dade448e215c0de989f33b10a8c03067ceeb20296635b42ff8e",
"0x4916cda5f6baa65a22d9dae68755e09c43ac4109e6abc5a7ab69dd435bb30a26",
"0x016ff8bfa3cb2354730ad25fbc5cf54d188f18b0ae26fc3457253dad24ab0079",
"0x82f730ef054ac6efefa9ef1c63dbae73556dcd5f5f449e11e415875bd8fbec2d",
"0xc4bbcb1fbec99d65bf59d85c8cb62ee2db963f0fe106f483d9afa73bd4e39a8a",
"0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
"0xb09c765fa3dc6ad138a8d0da17cd94306fbc32acb3d67bc093936861ccc48769",
"0x23d4a09295be678b21a5f1dceae1f634a69c1b41775f680ebf8165266471401b",
"0x19e6db1ce8f038fb9b27e76cbdce4c63853f59b1adeca6ebfcb4a643368fda4f",
"0x0000000000000000000000000000000000000000000000000000000000000002",
"0x0000000000000000000000000000000000000000000000000000000000000003",
"0x0000000000000000000000000000000000000000000000000000000000000004",
"0x0000000000000000000000000000000000000000000000000000000000000005",
"0x000000000000000000000000000000000000000000000000000000000000000c",
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

