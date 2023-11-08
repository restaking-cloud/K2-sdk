import { _extractChainID, _getChainSpecificConstants, customErrors } from './constants';
import _ from 'lodash';
import axios from 'axios';
import { CorruptionEventDataT, CorruptionEventT, CorruptionReportT, EffectiveBalanceReportT, LivenessDataT, LivenessReportT, MiddlewareInfoT } from '../types';
import { _getDebtor } from './k2Lending';
import { Signer, ethers } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';

const R = require('@blockswaplab/rpbs-self-attestation');

export const _add0x = (data: string) => {

	if(!data) {
		throw customErrors.NULL_OR_UNDEFINED_VALUE;
	}

	if(_.isString(data)) {
		return (data.indexOf('0x') !== -1) ? data : '0x'.concat(data);		
	}

	return data;
};

export const _remove0x = (data: string) => {

	if(!data) {
		throw customErrors.NULL_OR_UNDEFINED_VALUE;
	}

	if(_.isString(data)) {
		return (data.indexOf('0x') !== -1) ? data.slice(2) : data;
	}

	return data;
};

export const _getMiddlewareInfo = async (middlewareAPI: string): Promise<MiddlewareInfoT> => {

	const { data } = await axios.get<MiddlewareInfoT>(`${middlewareAPI}/info`);

	return data;
};

const _getLivenessData = async (livenessAPI: string, livenessQueryParams: string): Promise<LivenessDataT> => {

	const query = livenessQueryParams === '' ? '' : livenessQueryParams
	const { data } = await axios.get<LivenessDataT>(`${livenessAPI}${query}`);

	return data;
};

export const _generateLivenessReport = async (signer: Signer | Provider, middlewareAPI: string, debtorOverride: string | null = null, livenessQueryParams: string = '', message: string = '') => {

	const selfAttester = R.rpbs.SelfAttester.createSelfAttester();

	const rpbsPublicKey = R.curveOperations.encodePointInRPBSFormat(selfAttester.publicKey);

	const middlewareInfo = await _getMiddlewareInfo(middlewareAPI);

	const livenessEndpoint = middlewareInfo.LIVENESS_ENDPOINT;
	const version = middlewareInfo.VERSION;
	const debtor = debtorOverride ? debtorOverride : middlewareInfo.DEFAULT_SERVICE_PROVIDER_BORROW_ADDRESS;

	const livenessDataResponse: LivenessDataT = await _getLivenessData(livenessEndpoint, livenessQueryParams);

	const commonInfo = { livenessData: livenessDataResponse.livenessData };
	const signature = selfAttester.generateSignature(JSON.stringify(commonInfo), message);

	const marshalledSignature = {
        ...signature,
        z1Hat: R.curveOperations.encodePointInRPBSFormat(signature.z1Hat),
        m1Hat: R.curveOperations.encodePointInRPBSFormat(signature.m1Hat)
    }

	const debtPosition = await _getDebtor(signer, _add0x(debtor));

	const maxSlashableBN = ethers.BigNumber.from(debtPosition.maxSlashableAmountPerLiveness.toString());
	const proposedSlashingBN = maxSlashableBN.mul(ethers.utils.parseEther(livenessDataResponse.severityScore)).div(ethers.utils.parseEther('1'));

	const livenessReport: LivenessReportT = {
		rpbsSelfAttestation: {
			signature: marshalledSignature,
			commonInfo: commonInfo,
			publicKey: _remove0x(rpbsPublicKey)
		},
		eventType: "LIVENESS",
		version: version,
		eventData: {
			...commonInfo,
			proposedSlashing: proposedSlashingBN.toString(),
			query: livenessQueryParams
		},
		serviceProviderAddress: debtor
	};

	return livenessReport;
};

export const _verifyReport = async (middlewareAPI: string, report: LivenessReportT | CorruptionReportT) => {

	try {
        const response = await axios.post(`${middlewareAPI}/report`, report);
        return response.data;
    } catch(error: any) {
		throw new error.response.data;
    }
};

export const _getEffectiveBalance = async (beaconNodeUrl: string, blsPublicKey: string) => {

	blsPublicKey = _add0x(blsPublicKey);

	const report = await axios.get(`${beaconNodeUrl}/eth/v1/beacon/states/finalized/validators/${blsPublicKey}`);

	return report.data.data.validator.effective_balance;
};

export const _verifyEffectiveBalance = async (signer: Signer | Provider, report: EffectiveBalanceReportT) => {

	const chainID = await _extractChainID(signer);
	const constants = _getChainSpecificConstants(chainID);

	try {
        const response = await axios.post(`${constants.k2Urls.EFFECTIVE_BALANCE_VERIFIER}`, JSON.stringify(report));
        return response.data;
    } catch(error: any) {
		return error;
    }
}

export const _generateCorruptionReport = async (middlewareAPI: string, eventData: CorruptionEventDataT, message: string = '', debtorOverride: string | null = null) => {

	const selfAttester = R.rpbs.SelfAttester.createSelfAttester();

	const rpbsPublicKey = R.curveOperations.encodePointInRPBSFormat(selfAttester.publicKey);

	const middlewareInfo = await _getMiddlewareInfo(middlewareAPI);

	const version = middlewareInfo.VERSION;
	const debtor = debtorOverride ? debtorOverride : middlewareInfo.DEFAULT_SERVICE_PROVIDER_BORROW_ADDRESS;

	const commonInfo: CorruptionEventT = { events: eventData.events };

	const signature = selfAttester.generateSignature(JSON.stringify(commonInfo), message);

	const marshalledSignature = {
        ...signature,
        z1Hat: R.curveOperations.encodePointInRPBSFormat(signature.z1Hat),
        m1Hat: R.curveOperations.encodePointInRPBSFormat(signature.m1Hat)
    }

	const corruptionReport: CorruptionReportT = {
		rpbsSelfAttestation: {
			signature: marshalledSignature,
			commonInfo: commonInfo,
			publicKey: _remove0x(rpbsPublicKey)
		},
		eventType: "CORRUPTION",
		version: version,
		eventData: eventData,
		serviceProviderAddress: debtor
	};

	return corruptionReport;
};
