import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { DebtPositionType, SignatureECDSAT, SlashType } from '../types';
import { 
    _borrow, 
    _claimKETHForLender, 
    _deposit, 
    _depositFor,
    _getBorrowDuration, 
    _getDAOAddress, 
    _getDebtor, 
    _getDesignatedVerifier, 
    _getExpectedInterest, 
    _getKethAddress, 
    _getMaxBorrowableAmount, 
    _getNodeOperatorInclusionList, 
    _getOutstandingInterest, 
    _getProposerRegistry, 
    _getTotalBorrowableAmount, 
    _increaseDebt, 
    _liquidate, 
    _nodeOperatorClaim, 
    _nodeOperatorDeposit, 
    _nodeOperatorKick, 
    _nodeOperatorWithdraw, 
    _slash, 
    _terminate, 
    _topUpSlashAmount, 
    _totalSupply, 
    _transfer, 
    _transferFrom, 
    _withdraw 
} from '../logic/kSquaredLending';

export class KSquaredLendingClass {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }

    getDebtor(debtor: string) {
        return _getDebtor(this.etherSigner, debtor);
    }

    getKethAddress() {
        return _getKethAddress(this.etherSigner);
    }

    getBorrowDuration() {
        return _getBorrowDuration(this.etherSigner);
    }

    getDAOAddress() {
        return _getDAOAddress(this.etherSigner);
    }

    getProposerRegistry() {
        return _getProposerRegistry(this.etherSigner);
    }

    getNodeOperatorInclusionList() {
        return _getNodeOperatorInclusionList(this.etherSigner);
    }

    deposit(amount: string) {
        return _deposit(this.etherSigner, amount);
    }

    depositFor(amount: string, recipient: string) {
        return _depositFor(this.etherSigner, amount, recipient);
    }

    withdraw(amount: string, claim: boolean) {
        return _withdraw(this.etherSigner, amount, claim);
    }

    claimKETHForLender(lender: string) {
        return _claimKETHForLender(this.etherSigner, lender);
    }

    nodeOperatorDeposit(blsPublicKey: string, payoutRecipient: string, blsSignature: string, ecdsaSignature: SignatureECDSAT) {
        return _nodeOperatorDeposit(this.etherSigner, blsPublicKey, payoutRecipient, blsSignature, ecdsaSignature);
    }

    nodeOperatorWithdraw(blsPublicKey: string) {
        return _nodeOperatorWithdraw(this.etherSigner, blsPublicKey);
    }

    nodeOperatorKick(blsPublicKey: string) {
        return _nodeOperatorKick(this.etherSigner, blsPublicKey);
    }

    nodeOperatorClaim(blsPublicKeys: string[]) {
        return _nodeOperatorClaim(this.etherSigner, blsPublicKeys);
    }

    slash(slashType: SlashType, debtor: string, amount: string, recipient: string) {
        return _slash(this.etherSigner, slashType, debtor, amount, recipient);
    }

    terminate(debtor: string) {
        return _terminate(this.etherSigner, debtor);
    }

    liquidate(debtor: string) {
        return _liquidate(this.etherSigner, debtor);
    }

    topUpSlashAmount(amount: string) {
        return _topUpSlashAmount(this.etherSigner, amount);
    }

    borrow(debtPositionType: DebtPositionType, designatedVerifier: string, amount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string) {
        return _borrow(this.etherSigner, debtPositionType, designatedVerifier, amount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption);
    }

    increaseDebt(debtPositionType: DebtPositionType, designatedVerifier: string, amount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string, resetDuration: boolean) {
        return _increaseDebt(this.etherSigner, debtPositionType, designatedVerifier, amount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption, resetDuration);
    }

    totalSupply() {
        return _totalSupply(this.etherSigner);
    }

    getTotalBorrowableAmount() {
        return _getTotalBorrowableAmount(this.etherSigner);
    }

    getOutstandingInterest(debtor: string) {
        return _getOutstandingInterest(this.etherSigner, debtor);
    }

    getExpectedInterest(debtPositionType: DebtPositionType, newBorrowAmount: string, currentBorrowAmount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string, duration: string) {
        return _getExpectedInterest(this.etherSigner, debtPositionType, newBorrowAmount, currentBorrowAmount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption, duration);
    }

    getMaxBorrowableAmount(debtPositionType: DebtPositionType, interestAmount: string, currentBorrowAmount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string, duration: string) {
        return _getMaxBorrowableAmount(this.etherSigner, debtPositionType, interestAmount, currentBorrowAmount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption, duration);
    }

    getDesignatedVerifier(debtor: string) {
        return _getDesignatedVerifier(this.etherSigner, debtor);
    }

    transfer(to: string, amount: string) {
        return _transfer(this.etherSigner, to, amount);
    }

    transferFrom(from: string, to: string, amount: string) {
        return _transferFrom(this.etherSigner, from, to, amount);
    }
}
