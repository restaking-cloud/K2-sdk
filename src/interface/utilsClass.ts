import { Signer, Bytes, BigNumber } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
import {
    _add0x,
    _generateLivenessReport,
    _remove0x,
    _getMiddlewareInfo,
    _verifyReport,
    _verifyEffectiveBalance,
    _getEffectiveBalance,
    _generateCorruptionReport
} from '../logic/utils';
import { CorruptionEventDataT, CorruptionReportT, EffectiveBalanceReportT, LivenessReportT } from '../types';

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

    generateLivenessReport(middlewareAPI: string, debtorOverride: string | null = null, livenessQueryParams: string = '', message: string = '') {
        return _generateLivenessReport(this.etherSigner, middlewareAPI, debtorOverride, livenessQueryParams, message);
    }

    getMiddlewareInfo(middlewareAPI: string) {
        return _getMiddlewareInfo(middlewareAPI);
    }

    verifyReport(middlewareAPI: string, report: LivenessReportT | CorruptionReportT) {
        return _verifyReport(middlewareAPI, report);
    }

    getEffectiveBalance(beaconNodeUrl: string, blsPublicKey: string) {
        return _getEffectiveBalance(beaconNodeUrl, blsPublicKey);
    }

    verifyEffectiveBalance(effectiveBalanceReport: EffectiveBalanceReportT) {
        return _verifyEffectiveBalance(this.etherSigner, effectiveBalanceReport);
    }

    generateCorruptionReport(middlewareAPI: string, eventData: CorruptionEventDataT, message: string = '', debtorOverride: string | null = null) {
        return _generateCorruptionReport(middlewareAPI, eventData, message, debtorOverride);
    }
}