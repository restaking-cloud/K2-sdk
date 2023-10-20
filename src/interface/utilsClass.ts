import { Signer, Bytes, BigNumber } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import {
    _add0x,
    _generateLivenessReport,
    _remove0x,
    _getMiddlewareInfo,
    _verifyLivenessReport
} from '../logic/utils';
import { LivenessReportT } from '../types';

export class UtilsSubPackage {

    etherSigner;

    constructor(signer: Signer | Provider) {
        this.etherSigner = signer;
    }

    add0x(data: string) {
        return _add0x(data);
    }

    remove0x(data: string) {
        return _remove0x(data);
    }

    generateLivenessReport(middlewareAPI: string) {
        return _generateLivenessReport(this.etherSigner, middlewareAPI);
    }

    getMiddlewareInfo(middlewareAPI: string) {
        return _getMiddlewareInfo(middlewareAPI);
    }

    verifyLivenessReport(middlewareAPI: string, livenessReport: LivenessReportT) {
        return _verifyLivenessReport(middlewareAPI, livenessReport);
    }
}