# @blockswaplab/k2-sdk
K2 SDK is a typescript SDk which can be used to interact with the K2 Lending protocol.  

## Installation
To install the SDK use the command `npm i @blockswaplab/k2-sdk`

## Using the K2 SDK
One of the ways to import and initialise the SDK is:
```
import { K2 } from "@blockswaplab/k2-sdk";

const provider = new ethers.providers.InfuraProvider("goerli", {
    projectId: INFURA_PROJECT_ID,
    projectSecret: INFURA_PROJECT_SECRET
});
const signer = new ethers.Wallet(PRIV_KEY, provider);

const sdk = new K2(signer);
```
> Please note that the SDK is an `ethers.js` based SDK and hence requires `ethers` based signer instance. It also returns values in `ethers.js` supported format. For example, it returns `BigNumbers` for the smart contract view functions that might return `uint`.

The SDK exposed following sub-classes:
* [utils](./utils-README.md)  
* [contracts](./contracts-README.md)  
* [k2Lending](./k2-README.md)  
* [k2LendingDepositor](./k2LendingDepositor.md)  
* [reporterRegistry](./reporterRegistry-README.md)  
* [nodeOperatorModule](./nodeOperatorModule-README.md)
* constants  

## utils sub-class
The following readme describes all the functions and their parameters exposed by the `utils` class of the K2 SDK.  

### add0x function
This function can be used to append `0x` towards the start of a string to convert it into a hex string accepted by the contracts. If the input string already contains the `0x`, the function will return the string as is.  

#### Input Parameters
data: string which needs to be appended by `0x`

#### Using add0x function
```js
await sdk.utils.add0x(data);
```

#### Return Parameter
Returns hex string

### remove0x function
This function removes `0x` from the beginning of a string. If the input string doesn't contain `0x`, it will return the string as is.  

#### Input Parameters
data: string to remove `0x` from  

#### Using remove0x function
```js
await sdk.utils.remove0x(data);
```

#### Return Parameter
Returns string without `0x` in the beginning.  

### generateLivenessReport function
This function can be used to generate a liveness reports of the software being run.  

#### Input Parameters
middlewareAPI: API endpoint of the middleware

#### Using generateLivenessReport function
```js
await sdk.utils.generateLivenessReport(middlewareAPI);
```

#### Return Parameter
Returns a liveness report. Here's a sample liveness report:
```JSON
{
  "rpbsSelfAttestation": {
    "signature": {
      "z1Hat": "6404105216342bd57fa13ea8...310b519feb117f9e25087fe584f2",
      "c1Hat": "1e4b7e54b1ba032ef94f2b89...b6ef01c823e20454c1166fb9aa19",
      "s1Hat": "1d4a3c56bf2be321d0a6aac4...7a19ed3082b21c94357e16885278",
      "c2Hat": "16755d115768ef6ebb0c45d...f4b9ffe0126b599d5d486f5574653",
      "s2Hat": "1140c70f8b38105aca1d465...3bbe9f89dbc00da6646c48aa5eaa1",
      "m1Hat": "6404223e9396cce38a9bf6a...48d0df6055de44898ecd0e0004ca4"
    },
    "commonInfo": {
      "numOfValidatorsOnline": "8",
      "numOfValidatorsOffline": "2",
      "totalValidators": "10"
    },
    "publicKey": "630409260df6b583400e97...42db0603ca1fe7766d45ac42f6c0"
  },
  "eventType": "LIVENESS",
  "version": "1",
  "eventData": {
    "numOfValidatorsOnline": "8",
    "numOfValidatorsOffline": "2",
    "totalValidators": "10",
    "proposedSlashing": "0"
  }
}
```

### getMiddlewareInfo function
This function can be used to get the info from the middleware endpoint.  

#### Input Parameters
middlewareAPI: API endpoint of the middleware  

#### Using getMiddlewareInfo function
```js
await sdk.utils.getMiddlewareInfo(middlewareAPI);
```

#### Return Parameter
The function returns info related to the middleware API. Here's an example of the info:
```JSON
{
    "VERSION":"1",
    "CHAIN_ID":"5","SERVICE_PROVIDER_BORROW_ADDRESS":"0xEa0F09A471dCe34d7d3675787B1D68D841FF56D2","K2_LENDING_CONTRACT":"0x7E015fa28e05eD002Ac166D230cD3c3726CC2e7E","K2_REPORTER_REGISTRY":"0x88Cc3B6e96ef8E78b592eaDc135a0DF31991bE20","LIVENESS_ENDPOINT":"https://endpoint.amazonaws.com/goerli/liveness",
    "REPORT_DEADLINE_LENGTH_IN_ETH_BLOCKS":"125"
}
```

### verifyReport function
Once the liveness or the corruption report has been generated, it needs to be verified before submitting it to the reporter registry. To verify the report, `verifyReport` function should be used.  

#### Input Parameters
middlewareAPI: API endpoint of the middleware  
report: Liveness or the corruption report returned by the respective function  

#### Using verifyLivenessReport function
```js
await sdk.utils.verifyReport(middlewareAPI, report);
```

#### Return Parameter
The function returns a verified report which contains the liveness report or the corruption along with a signature valid for 20 minutes. Here's how a verified liveness report looks like:
```JSON
{
  "inputs": {
    "rpbsSelfAttestation": {
      "signature": {
      "z1Hat": "6404105216342bd57fa13ea8...310b519feb117f9e25087fe584f2",
      "c1Hat": "1e4b7e54b1ba032ef94f2b89...b6ef01c823e20454c1166fb9aa19",
      "s1Hat": "1d4a3c56bf2be321d0a6aac4...7a19ed3082b21c94357e16885278",
      "c2Hat": "16755d115768ef6ebb0c45d...f4b9ffe0126b599d5d486f5574653",
      "s2Hat": "1140c70f8b38105aca1d465...3bbe9f89dbc00da6646c48aa5eaa1",
      "m1Hat": "6404223e9396cce38a9bf6a...48d0df6055de44898ecd0e0004ca4"
    },
      "commonInfo": {
        "numOfValidatorsOnline": "8",
        "numOfValidatorsOffline": "2",
        "totalValidators": "10"
      },
      "publicKey": "630409260df6b583400e97...42db0603ca1fe7766d45ac42f6c0"
    },
    "eventType": "LIVENESS",
    "version": "1",
    "eventData": {
      "numOfValidatorsOnline": "8",
      "numOfValidatorsOffline": "2",
      "totalValidators": "10",
      "proposedSlashing": "100000000000000000"
    }
  },
  "signedReport": {
    "slashType": "0",
    "debtor": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "block": 9819746,
    "signature": "0x3634303432336464663333323864663263623136393239373137626261356634353366323963396637623832313062343537633436633237363731383938303230386533306432346662636537316531333061366538663364346161333731616461646464653639663834346163316464616365386363663562626632653561633166643a313838333339343262373434633436323232343865323862346465353963613930633639366530623538633336393433666362643566386136383361656461653a306631316464373530393337306632316339393534643063373432313338303632323931323734393961373961386663376633353963643434353439306363353a323631363139626337656338306630613863663333643836643430373062636465313262383138303632653437396236333235623836396438323066343933633a313662383438646230666533303561363366353061346633613661383963613165326531616165626363653630363431623865633931643438323439363335343a363430343136373630313961363065396135336563323766303835363638336433653039396130616331643938376665633165636464383663636536633866643438363232306237373165643464303836343730376334666436386631386363663831333135643533303531373964346237346233363530343933346164306130326163",
    "amount": {
      "type": "BigNumber",
      "hex": "0x016345785d8a0000"
    },
    "identifier": 1
  },
  "designatedVerifierSignature": {
    "deadline": 9819746,
    "v": 27,
    "r": "0x3a61148c3a2fdd3a9fe2c6133bbddf579333a630663f0c19dce8ecfb62484392",
    "s": "0x1b4f68b48c177edf8f10f1f382cfb0c73920ecac7ed564e82909d57f119b3a11"
  }
}
```

### verifyEffectiveBalance function
This function can be used to verify effective balance of a BLS public key.  

#### Input Parameters
report: Effective balance report of the BLS public key of the following format:
```
{
  "blsKey": "<BLS_PUBLIC_KEY>",
  "effectiveBalance": "<EFFECTIVE_BALANCE>"
}
```

#### Using verifyEffectiveBalance function
```js
await sdk.utils.verifyEffectiveBalance(report);
```

#### Return Parameter
The function returns signature after the report has been successfully verified and error otherwise.  

## contractInstance sub-class
The SDK also exposes the contractInstance sub-class which provides an instance for contracts used in the K2 lending protocol. These instances can be used to call smart contract functions that may or may not exist in the SDK.  

### Contract instances exposed by the sub-class
* k2LendingContract  
* k2LendingDepositor  
* ReporterRegistry  
* nodeOperatorModule  

## Using the contractInstance class
```ts
const k2LendingContractInstance = await sdk.contracts.k2LendingContract();
const k2LendingDepositorInstance = await sdk.contracts.k2LendingDepositor();
const reporterRegistryInstance = await sdk.contracts.reporterRegistry();
const nodeOperatorModuleInstance = await sdk.contracts.nodeOperatorModule();
```
All the contract instances can be directly accessed without any input parameter.  

## k2Lending sub-class
The following readme describes all the functions and their parameters exposed by the `k2Lending` class of the K2 SDK. This class exposes all the important functions from the K2 Lending protocol.  

### getDebtor function
This function allows anyone to get the debtor related information just by the debtor address.  

#### Input Parameters
debtor: ETH address of the debtor  

#### Using getDebtor function
```ts
await sdk.k2Lending.getDebtor(debtor);
```

#### Return Parameter
Returns data of a particular debtor.  

### getKethAddress function
Get the kETH address.  

#### Using getKethAddress function
```ts
await sdk.k2Lending.getKethAddress();
```

#### Return Parameter
kETH address for the respective network.  

### getBorrowDuration function
Get the borrow duration set by the contract.  

#### Using getBorrowDuration function
```ts
await sdk.k2Lending.getBorrowDuration();
```

#### Return Parameter
Borrow duration in BigNumbers.  

### getDAOAddress function
Get the DAO address associated with the contract.  

#### Using getDAOAddress function
```ts
await sdk.k2Lending.getDAOAddress();
```

#### Return Parameter
ETH address of the DAO.  

### getProposerRegistry function
Get the proposer registry ETH address.  

#### Using getProposerRegistry function
```ts
await sdk.k2Lending.getProposerRegistry();
```

#### Return Parameter
ETH address of the proposer registry.  

### deposit function
Deposits KETH into the pool and mints pool shares to the sender.  

#### Input Parameters
amount: amount of kETH to be deposited  

#### Using deposit function
```ts
await sdk.k2Lending.deposit(amount);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### depositFor function
Deposit kETH for another ETH address.  

#### Input Parameters
amount: amount of kETH to be deposited  
recipient: ETH address to deposit kETH for  

#### Using depositFor function
```ts
await sdk.k2Lending.depositFor(amount, recipient);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### withdraw function
Burns shares from the sender and returns the equivalent fraction of remaining KETH liquidity. Optionally, sends all KETH accrued by the lender.  

#### Input Parameters
amount: amount of kETH to be withdrawn  
claim: `true` for claiming accrued kETH  

#### Using withdraw function
```ts
await sdk.k2Lending.withdraw(amount, claim);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### claimKETHForLender function
Claims all of the accrued KETH for the lender and sends it to the lender's address.  

#### Input Parameters
lender: ETH address of the lender  

#### Using claimKETHForLender function
```ts
await sdk.k2Lending.claimKETHForLender(lender);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### nodeOperatorDeposit function
Deposit node operator in K2 lending protocol.  

#### Input Parameters
blsPublicKey: BLS public key of the validator  
payoutRecipient: ETH address of the recipient that would receive payout  
blsSignature: BLS Signature associated with the BLS public key  
ecdsaSignature: ECDSA signature  

#### Using nodeOperatorDeposit function
```ts
await sdk.k2Lending.nodeOperatorDeposit(blsPublicKey, payoutRecipient, blsSignature, ecdsaSignature);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### nodeOperatorWithdraw function
Withdraw node operator from the K2 Lending protocol.  

#### Input Parameters
nodeOperatorAddress: ETH address of the node operator  
blsPublicKey: BLS public key string  

#### Using nodeOperatorWithdraw function
```ts
await sdk.k2Lending.nodeOperatorWithdraw(nodeOperatorAddress, blsPublicKey);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### nodeOperatorKick function
Kick node operator from the K2 Lending protocol.  

#### Input Parameters
reporterAddress: ETH address of the reporter  
blsPublicKey: BLS public key

#### Using nodeOperatorKick function
```ts
await sdk.k2Lending.nodeOperatorKick(reporterAddress, blsPublicKey);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### nodeOperatorClaim function
Claim ETH earned for all the BLS public keys associated with a node operator.  

#### Input Parameters
blsPublicKeys: List of BLS public keys to claim for  

#### Using nodeOperatorClaim function
```ts
await sdk.k2Lending.nodeOperatorClaim(blsPublicKeys);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### slash function
Slash KETH from the pool. This function can only be called by a reporter.  

#### Input Parameters
slashType: the slash type (liveness & corruption)
debtor: the debtor address
amount: the slash amount
recipient: the recipient address

#### Using slash function
```ts
await sdk.k2Lending.slash(slashType, debtor, amount, recipient);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### terminate function
Terminate debt position  

#### Using terminate function
```ts
await sdk.k2Lending.terminate();
```

#### Return Parameter
Transaction details if the transaction was successful.  

### liquidate function
Liquidate debt position.  

#### Input Parameters
debtor: ETH address of the debtor  

#### Using liquidate function
```ts
await sdk.k2Lending.liquidate(debtor);
```

#### Return Parameter
Transaction details if the transaction was successful.  


### topUpSlashAmount function
Top up kETH if it gets slashed.  

#### Input Parameters
amount: amount of kETH to topup  

#### Using topUpSlashAmount function
```ts
await sdk.k2Lending.topUpSlashAmount(amount);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### borrow function
Borrows KETH from the pool and records the debt to the debtor's address

#### Input Parameters
debtPositionType: debt position type
designatedVerifier The designated verifier of debtor
amount: The debt principal to borrow
maxSlashableAmountPerLiveness: Maximum slashable amount per liveness
maxSlashableAmountPerCorruption: Maximum slashable amount per corruption

#### Using borrow function
```ts
await sdk.k2Lending.borrow(debtPositionType, designatedVerifier, amount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption);
```

#### Return Parameter
Transaction details if the transaction was successful.  

### setHookAsDebtorForSBP function
External hook contract. Set to address(0) to disable the hook  

#### Input Parameters
hookAddress: ETH address of the hook contract. Set to address(0) by default  

#### Using setHookAsDebtorForSBP function
```ts
await sdk.k2Lending.setHookAsDebtorForSBP(hookAddress);
```

#### Return Parameter
Transaction details if the transaction was successful.  


## k2LendingDepositor sub-class
The following readme describes all the functions and their parameters exposed by the `k2LendingDepositor` class of the K2 SDK. This sub-class contains all the important functions from the K2 Lending depositor contract of the K2 Lending protocol.    

### getKethVaultAddress function
This function can be used to get the kETH vault address registered with the contract.  

#### Using getKethVaultAddress function
```ts
await sdk.k2LendingDepositor.getKethVaultAddress();
```

#### Return parameters
ETH address of the kETH vault.  

### getk2LendingContractAddress function
This function can be used to get the K2 Lending contract address.  

#### Using getk2LendingContractAddress function
```ts
await sdk.k2LendingDepositor.getk2LendingContractAddress();
```

#### Return parameters
ETH address of the K2 Lending contract.  

### deposit function
This function can be used to deposit tokens to the contract.  

#### Input Parameters
tokenAddress: Token address to deposit into the contract  
amount: Amount of tokens to be deposited  

#### Using deposit function
```ts
await sdk.k2LendingDepositor.deposit(tokenAddress, amount);
```

#### Return parameters
Transaction hash if the deposit was successful.  

## reporterRegistry sub-class
The following readme describes all the functions and their parameters exposed by the `reporterRegistry` class of the K2 SDK. This sub-class of the SDK exposes all the functions from the reporter registry contract of the K2 Lending protocol.  

### getk2LendingPoolAdress function
This function can be used to get the contract address of the K2 Lending pool.  

#### Using getk2LendingPoolAdress function
```js
await sdk.reporterRegistry.getk2LendingPoolAdress();
```

#### Return Parameter
Returns contract address.  

### isReporterActive function
Check the contracts if the reporter is active.  

#### Input Parameters
reporter: ETH Address of the reporter  

#### Using isReporterActive function
```js
await sdk.reporterRegistry.isReporterActive(reporter);
```

#### Return Parameter
Boolean, `true` if active, `false` otherwise.  

### isReporterRagequitted function
Check the contracts if the reporter has rage quitted or not.  

#### Input Parameters
reporter: ETH address of the reporter  

#### Using isReporterRagequitted function
```js
await sdk.reporterRegistry.isReporterRagequitted(reporter);
```

#### Return Parameter
Boolean, `true` if rage quitted, `false` otherwise.  

### isReportUsed function
Check if the reporter has been already used or not.  

#### Input Parameters
reporter: ETH address of the reporter  

#### Using isReportUsed function
```js
await sdk.reporterRegistry.isReportUsed(reporter);
```

#### Return Parameter
Boolean, `true` if already used, `false` otherwise.  

### registerReporter function
Register a reporter to the reporter registry contract. The `msg.sender` will be registered as the reporter.  

#### Using registerReporter function
```js
await sdk.reporterRegistry.registerReporter();
```

#### Return Parameter
Transaction details if the transaction is successful.  

### isReporterOperational function
Check if the reporter is operational and can perform reports. An operational reporter is the one that is active and hasn't rage quitted.  

#### Input Parameters
reporter: ETH address of the reporter  

#### Using isReporterOperational function
```js
await sdk.reporterRegistry.isReporterOperational(reporter);
```

#### Return Parameter
Boolean, `true` if reporter is operational, `false` otherwise.  

### batchSubmitReports function
Function to submit multiple verified reports in a single transaction.  

#### Input Parameters
reports: List of verified reports of the following structure:
```
{
    slashType: SlashType;
    debtor: string;     // Borrower address
    amount: number;     // Amount being slashed
    identifier: number; // Unique ID to avoid double reporting
    block: number;      // Block number
    signature: string;  // Blind signature being reported
};
```
reportSignatures: List of signatures (designatedVerifierSignature obtained after verifying the reports) of the respective reports. Each signature follows the following structure:
```
{
    v: number; // version
    r: string; // x coordinate of the curve
    s: string; // y coordinate of the curve
}
```

#### Using batchSubmitReports function
```js
await sdk.reporterRegistry.batchSubmitReports(reports, reportSignatures);
```

#### Return Parameter
Transaction details if the transaction is successful.  

### reportTypedHash function
Calculate typed hash of report struct.  

#### Input Parameters
report: verified report of the following structure:
```
{
    slashType: SlashType;
    debtor: string;     // Borrower address
    amount: number;     // Amount being slashed
    identifier: number; // Unique ID to avoid double reporting
    block: number;      // Block number
    signature: string;  // Blind signature being reported
};
```

#### Using reportTypedHash function
```js
await sdk.reporterRegistry.reportTypedHash(report);
```

#### Return Parameter
`bytes32` hash string  

### isValidReport function


#### Input Parameters
report: Verified report obtained from the `verifyReport` function, of the following structure:
```
{
    slashType: SlashType;
    debtor: string;     // Borrower address
    amount: number;     // Amount being slashed
    identifier: number; // Unique ID to avoid double reporting
    block: number;      // Block number
    signature: string;  // Blind signature being reported
};
```
reportSignature: Signature (designatedVerifierSignature obtained after verifying the reports) of the respective report. The signature follows the following structure:
```
{
    v: number; // version
    r: string; // x coordinate of the curve
    s: string; // y coordinate of the curve
}
```

#### Using isValidReport function
```js
await sdk.reporterRegistry.isValidReport(report, reportSignature);
```

#### Return Parameter
Returns `true` if valid, `false` otherwise.  

## nodeOperatorModule sub-class
The following readme describes all the functions and their parameters exposed by the `nodeOperatorModule` class of the K2 SDK. This sub-class contains all the important functions from the K2 Node Operator Module contract of the K2 Lending protocol.  

### getk2LendingContract function
This function can be used to get the k2 Lending contract address set in the K2 Node operator module contract.  

#### Using getk2LendingContract function
```ts
await sdk.nodeOperatorModule.getk2LendingContract();
```

#### Return parameters
ETH address of the k2Lending contract.  

### getReporterRegistryContract function
This function can be used to get the reporter registry contract address set in the K2 Node operator module contract.  

#### Using getReporterRegistryContract function
```ts
await sdk.nodeOperatorModule.getReporterRegistryContract();
```

#### Return parameters
ETH address of the Reporter registry contract. 

### batchNodeOperatorKick function
Report multiple BLS keys for kicking from K2 pool.  

##### Input Parameters
blsPublicKeys: List of BLS public keys to kick  
effectiveBalances: List of effective balance in string for respective BLS public keys  
designatedVerifierSignatures: List of verifier signatures of the format SignatureECDSAT (defined in the K2-SDK) for the respective BLS public keys  

#### Using batchNodeOperatorKick function
```ts
await sdk.nodeOperatorModule.batchNodeOperatorKick(blsPublicKeys, effectiveBalances, designatedVerifierSignatures);
```

#### Return parameters
Transaction details if the transaction is successful.  

### nodeOperatorClaim function
Batch node operator claims must come with an effective balance report.  

##### Input Parameters
blsPublicKeys: List of BLS public keys to kick  
effectiveBalances: List of effective balance in string for respective BLS public keys  
designatedVerifierSignatures: List of verifier signatures of the format SignatureECDSAT (defined in the K2-SDK) for the respective BLS public keys  

#### Using nodeOperatorClaim function
```ts
await sdk.nodeOperatorModule.nodeOperatorClaim(blsPublicKeys, effectiveBalances, designatedVerifierSignatures);
```

#### Return parameters
Transaction details if the transaction is successful.  

### isValidReport function
Check whether a kick due to effective balance is valid  

##### Input Parameters
blsPublicKey: BLS public key to kick  
effectiveBalance: Effective balance in string for the respective BLS public key  
designatedVerifierSignature: Verifier signature of the format SignatureECDSAT (defined in the K2-SDK) for the respective BLS public key  

#### Using isValidReport function
```ts
await sdk.nodeOperatorModule.isValidReport(blsPublicKey, effectiveBalance, designatedVerifierSignature);
```

#### Return parameters
`true` if report is valid, `false` otherwise.  
