import {
    IconCube,
    IconCurrencyEthereum,
    IconGasStation,
    IconSum,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import EtherScan from '../../lib/EtherScan';
import StatusContainer from './StatusContainer';

function CurrentStatus() {
    const [totalSupply, setTotalSupply] = useState(undefined);
    const [inUSD, setInUSD] = useState(0);
    const [inBTC, setInBTC] = useState(0);
    const [recentBlock, setRecentBlock] = useState(0);
    const [gasFees, setGasFees] = useState({
        safeGasPrice: 0,
        proposeGasPrice: 0,
        fastGasPrice: 0,
    });

    useEffect(() => {
        const totalSupplyOfEther = async () => {
            setTotalSupply(await EtherScan.totalSupplyOfEthers());
        };

        const getEtherPrice = async () => {
            const prices = await EtherScan.lastEtherumPrice();
            setInBTC(prices.btc);
            setInUSD(prices.usd);
        };

        const mostRecentBlock = async () => {
            setRecentBlock(await EtherScan.mostRecentBlock());
        };

        const getGasFees = async () => {
            setGasFees(await EtherScan.gasFees());
        };

        totalSupplyOfEther();
        getEtherPrice();
        mostRecentBlock();
        getGasFees();
    }, []);

    return (
        <div className="mt-10 container mx-auto p-3 border-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatusContainer
                icon={<IconCurrencyEthereum size={45} />}
                tag={'Ethereum Price'}
                value={`${inUSD} @ ${inBTC}btc`}
            />
            <StatusContainer
                icon={<IconSum size={45} />}
                tag={'Total Ethereum Supply'}
                value={totalSupply}
            />
            <StatusContainer
                icon={<IconCube size={45} />}
                tag={'Last Block'}
                value={recentBlock}
            />
            <StatusContainer
                icon={<IconGasStation size={45} />}
                tag={'Safe Gas Fee'}
                value={`${gasFees.safeGasPrice}wei`}
            />
        </div>
    );
}

export default CurrentStatus;
