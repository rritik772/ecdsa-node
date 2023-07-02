import numeral from 'numeral';
import { Utils } from 'alchemy-sdk';

const ETHERSCANAPIKEY = process.env.REACT_APP_ETHER_API_KEY;

async function totalSupplyOfEthers() {
    const URL = `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${ETHERSCANAPIKEY}`;
    const response = await fetch(URL);
    const jsonBody = await response.json();

    const totalSupplyInWei = jsonBody.result;
    const inEther = Utils.formatUnits(totalSupplyInWei, 'ether');

    return numeral(inEther).format('0,0.0a');
}

async function lastEtherumPrice() {
    const URL = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCANAPIKEY}`;
    const response = await fetch(URL);
    const jsonBody = await response.json();

    const usd = numeral(jsonBody.result.ethusd).format('$000.0[0000]');
    const btc = numeral(jsonBody.result.ethbtc).format('0.0[000000]a');

    return {
        usd,
        btc,
        timestamp: jsonBody.result.ethbtc_timestamp,
    };
}

async function mostRecentBlock() {
    const URL = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${ETHERSCANAPIKEY}`;
    const response = await fetch(URL);
    const jsonBody = await response.json();

    const inNumber = parseInt(Number(jsonBody.result), 10);
    return inNumber;
}

async function gasFees() {
    const URL = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCANAPIKEY}`;
    const response = await fetch(URL);
    const jsonBody = await response.json();
    const result = jsonBody.result;

    const safeGasPrice = Utils.formatUnits(result.SafeGasPrice, 'wei');
    const proposeGasPrice = Utils.formatUnits(result.ProposeGasPrice, 'wei');
    const fastGasPrice = Utils.formatUnits(result.FastGasPrice, 'wei');

    return {
        safeGasPrice,
        proposeGasPrice,
        fastGasPrice,
    };
}

async function getBlockData(blockNumber) {
    const URL = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${ETHERSCANAPIKEY}`;
    const response = await fetch(URL);
    const jsonBody = await response.json();
    const result = jsonBody.result;

    return result;
}

const exports = {
    gasFees,
    getBlockData,
    lastEtherumPrice,
    mostRecentBlock,
    totalSupplyOfEthers,
};

export default exports;
