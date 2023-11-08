import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import { _getChainSpecificConstants, _extractChainID } from './constants';
import { 
    KSquaredLending_abi__factory,
    KSquaredLendingDepositor_abi__factory,
    Reporter_registry_abi__factory,
    Node_operator_module_abi__factory
} from '../contracts/index';

export const _k2LendingContract = async (signer: Signer | Provider) => {
    const chainID = await _extractChainID(signer);
    const values = _getChainSpecificConstants(chainID);

    return KSquaredLending_abi__factory.connect(
        values?.factoryAddresses.K2_LENDING as string,
        signer
    );
};

export const _k2LendingDepositor = async (signer: Signer | Provider) => {
    const chainID = await _extractChainID(signer);
    const values = _getChainSpecificConstants(chainID);

    return KSquaredLendingDepositor_abi__factory.connect(
        values?.factoryAddresses.K2_LENDING_DEPOSITOR as string,
        signer
    );
};
    
export const _reporterRegistry = async (signer: Signer | Provider) => {
    const chainID = await _extractChainID(signer);
    const values = _getChainSpecificConstants(chainID);

    return Reporter_registry_abi__factory.connect(
        values?.factoryAddresses.REPORTER_REGISTRY as string,
        signer
    );
};

export const _nodeOperatorModule = async (signer: Signer | Provider) => {
    const chainID = await _extractChainID(signer);
    const values = _getChainSpecificConstants(chainID);

    return Node_operator_module_abi__factory.connect(
        values?.factoryAddresses.NODE_OPERATOR_MODULE as string,
        signer
    );
};
