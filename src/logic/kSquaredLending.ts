import { customErrors } from './constants';
import { getContractInstance } from './contracts';
import _ from 'lodash';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { _add0x, _remove0x } from './utils';
import { SlashType, SignatureECDSAT, DebtPositionType } from '../types';

export const _getDebtor = async (signer: Signer | Provider, debtor: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.getDebtor(_add0x(debtor));
};

export const _getKethAddress = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.keth();
};

export const _getBorrowDuration = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.borrowDuration();
};

export const _getDAOAddress = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.daoAddress();
};

export const _getProposerRegistry = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.proposerRegistry();
};

export const _getNodeOperatorInclusionList = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.nodeOperatorInclusionList();
};

export const _deposit = async (signer: Signer | Provider, amount: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.deposit(amount);
};

export const _depositFor = async (signer: Signer | Provider, amount: string, recipient: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.depositFor(amount, _add0x(recipient));
};

export const _withdraw = async (signer: Signer | Provider, amount: string, claim: boolean) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.withdraw(amount, claim);
};

export const _claimKETHForLender = async (signer: Signer | Provider, lender: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.claimKETH(_add0x(lender));
};

export const _nodeOperatorDeposit = async (signer: Signer | Provider, blsPublicKey: string, payoutRecipient: string, blsSignature: string, ecdsaSignature: SignatureECDSAT) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.nodeOperatorDeposit(
        _add0x(blsPublicKey),
        _add0x(payoutRecipient),
        _add0x(blsSignature),
        ecdsaSignature
    );
};

export const _nodeOperatorWithdraw = async (signer: Signer | Provider, blsPublicKey: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.nodeOperatorWithdraw(_add0x(blsPublicKey));
};

export const _nodeOperatorKick = async (signer: Signer | Provider, blsPublicKey: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.nodeOperatorKick(_add0x(blsPublicKey));
};

export const _nodeOperatorClaim = async (signer: Signer | Provider, blsPublicKeys: string[]) => {

    const len = blsPublicKeys.length;
    if(len == 0) {
        throw customErrors.NULL_OR_UNDEFINED_VALUE;
    }

    for(let i=0; i<len; ++i) {
        blsPublicKeys[i] = _add0x(blsPublicKeys[i]);
    }

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.nodeOperatorClaim(blsPublicKeys);
};

export const _slash = async (signer: Signer | Provider, slashType: SlashType, debtor: string, amount: string, recipient: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.slash(slashType, _add0x(debtor), amount, _add0x(recipient));
};

export const _terminate = async (signer: Signer | Provider, debtor: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.terminate(_add0x(debtor));
};

export const _liquidate = async (signer: Signer | Provider, debtor: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.liquidate(_add0x(debtor));
};

export const _topUpSlashAmount = async (signer: Signer | Provider, amount: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.topUpSlashAmount(amount);
};

export const _borrow = async (signer: Signer | Provider, debtPositionType: DebtPositionType, designatedVerifier: string, amount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.borrow(debtPositionType, _add0x(designatedVerifier), amount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption);
};

export const _increaseDebt = async (signer: Signer | Provider, debtPositionType: DebtPositionType, designatedVerifier: string, amount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string, resetDuration: boolean) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.increaseDebt(debtPositionType, _add0x(designatedVerifier), amount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption, resetDuration);
};

export const _totalSupply = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.totalSupply();
};

export const _getTotalBorrowableAmount = async (signer: Signer | Provider) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.getTotalBorrowableAmount();
};

export const _getOutstandingInterest = async (signer: Signer | Provider, debtor: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.getOutstandingInterest(_add0x(debtor));
};

export const _getExpectedInterest = async (signer: Signer | Provider, debtPositionType: DebtPositionType, newBorrowAmount: string, currentBorrowAmount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string, duration: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.getExpectedInterest(debtPositionType, newBorrowAmount, currentBorrowAmount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption, duration);
};

export const _getMaxBorrowableAmount = async (signer: Signer | Provider, debtPositionType: DebtPositionType, interestAmount: string, currentBorrowAmount: string, maxSlashableAmountPerLiveness: string, maxSlashableAmountPerCorruption: string, duration: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.getMaxBorrowableAmount(debtPositionType, interestAmount, currentBorrowAmount, maxSlashableAmountPerLiveness, maxSlashableAmountPerCorruption, duration);
};

export const _getDesignatedVerifier = async (signer: Signer | Provider, debtor: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.getDesignatedVerifier(_add0x(debtor));
};

export const _transfer = async (signer: Signer | Provider, to: string, amount: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.transfer(_add0x(to), amount);
};

export const _transferFrom = async (signer: Signer | Provider, from: string, to: string, amount: string) => {

    const contract = (await getContractInstance(signer)).kSquaredLendingContract();

    return contract.transferFrom(_add0x(from), _add0x(to), amount);
};
