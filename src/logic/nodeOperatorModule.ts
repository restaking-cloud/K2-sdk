import { customErrors } from './constants';
import { _nodeOperatorModule } from './contracts';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { _add0x, _remove0x } from './utils';
import { SlashType, SignatureECDSAT, DebtPositionType } from '../types';

export const _getK2LendingContract = async (signer: Signer | Provider) => {

    const contract = await _nodeOperatorModule(signer);

    return contract.lending();
};

export const _getReporterRegistryContract = async (signer: Signer | Provider) => {

    const contract = await _nodeOperatorModule(signer);

    return contract.reporterRegistry();
};

export const _batchNodeOperatorKick = async (signer: Signer | Provider, blsPublicKeys: string[], effectiveBalances: string[], designatedVerifierSignatures: SignatureECDSAT[]) => {

    const len = blsPublicKeys.length;

    if(len != effectiveBalances.length || len != designatedVerifierSignatures.length) {
        throw customErrors.UNEQUAL_ARRAY_LENGTH;
    }

    for(let i=0; i<len; ++i) {
        blsPublicKeys[i] = _add0x(blsPublicKeys[i]);
    }

    const contract = await _nodeOperatorModule(signer);

    return contract.batchNodeOperatorKick(blsPublicKeys, effectiveBalances, designatedVerifierSignatures);
};

export const _nodeOperatorClaim = async (signer: Signer | Provider, blsPublicKeys: string[], effectiveBalances: string[], designatedVerifierSignatures: SignatureECDSAT[]) => {

    const len = blsPublicKeys.length;

    if(len != effectiveBalances.length || len != designatedVerifierSignatures.length) {
        throw customErrors.UNEQUAL_ARRAY_LENGTH;
    }

    for(let i=0; i<len; ++i) {
        blsPublicKeys[i] = _add0x(blsPublicKeys[i]);
    }

    const contract = await _nodeOperatorModule(signer);

    return contract.nodeOperatorClaim(blsPublicKeys, effectiveBalances, designatedVerifierSignatures);
};

export const _isValidReport = async (signer: Signer | Provider, blsPublicKey: string, effectiveBalance: string, designatedVerifierSignature: SignatureECDSAT) => {

    const contract = await _nodeOperatorModule(signer);

    return contract.isValidReport(_add0x(blsPublicKey), effectiveBalance, designatedVerifierSignature);
};
