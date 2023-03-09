# Hello everyone!

## I am pleased to present my <span style="color:orangered">Decentralized Exchange<span>.

### Here's a little about the project:

- <span style="color:red">Header:
  Here you can use navigation, view your messages, and connect a wallet (this wallet does not hold any value and is completely fake). In the wallet itself, you can view your balance, wallet address, send and receive transactions (coming soon), and change the network.

- <span style="color:#6e42ca">Greeting page<span>:
  Here, I talk a little about the project and why I created it.
- <span style="color:#6e42ca">Swap page<span>:
  The UI of this page is similar to many other real DEXs. Here, you can select coins/tokens to exchange. In the settings, you can choose Slippage Tolerance to allow the DEX to ignore the selected percentage of fluctuations in the price of the exchanged assets. In "Select token," you can choose an asset to exchange that is represented by the DEX. If the wallet is connected and the assets are selected, you can see your available balance, enter the exchange details, and complete the transaction. Be aware that a commission (virtual) of 0.3% must be paid to complete the transaction, and some coins or tokens from input #1 on the wallet must be left to ensure the transaction is successful. Also, remember that your swap depends on several factors: the reserves of assets (shown in the Currency Reserves block under the Swap block) #1 and #2, their current price, and the amount of exchanged assets (value in input #1) on the DEX. The price calculation for the exchange can be seen by opening the src\utils\priceCalc.ts file. Each DEX has a certain liquidity, and the price of the asset during the exchange is tied to the amount of exchanged assets and their reserves on the DEX. The Price Impact indicator will show you how the amount of exchanged assets affects the price. The calculation of the Price Impact can be seen by opening the src/utils/impactCalc.ts file.
  ![Swap page](https://github.com/Puishoanton/Crypto-Decentralized-Exchange/blob/master/src/assets/readme_imgs/swap.jpg)
- <span style="color:#6e42ca">Pools page<span>: Here, you can see the available pools, their locked reserves, the percentage of annual rewards,and your locked liquidity. There are also two buttons that redirect you to the Add&Redeem liquidity pages.
  ![Pools page](https://github.com/Puishoanton/Crypto-Decentralized-Exchange/blob/master/src/assets/readme_imgs/pools.jpg)
- <span style="color:#6e42ca">Add Liquidity page<span>:
  Here, you can add your liquidity to the selected pools, for which you will receive LP tokens and set up Slippage Tolerance. Also, there is a fee of 0.3% for adding liquidity.
  ![Add Liquidity page](https://github.com/Puishoanton/Crypto-Decentralized-Exchange/blob/master/src/assets/readme_imgs/add.jpg)
- <span style="color:#6e42ca">Redeem Liquidity page<span>:
  Here you can retrieve your liquidity by exchanging your LP tokens for selected assets in a 50-50 ratio (Output in the Redeem LP block).
  ![Redeem Liquidity page](https://github.com/Puishoanton/Crypto-Decentralized-Exchange/blob/master/src/assets/readme_imgs/remove.jpg)
 - <span style="color:#6e42ca">Faucet page<span>: To perform any activity in this application, we need coins that we can obtain from the faucet. Here is a list of all available coins or tokens on the DEX. Only users with a connected wallet can request assets. When you click on Request, you will receive 100 selected coins in your wallet.
  ![Redeem Liquidity page](https://github.com/Puishoanton/Crypto-Decentralized-Exchange/blob/master/src/assets/readme_imgs/faucet.jpg)
