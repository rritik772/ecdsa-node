import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useContext, createContext, useState, useEffect } from 'react';

import EtherScan from '../lib/EtherScan';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const BlockContext = createContext(null);
const useBlockContext = () => useContext(BlockContext);

function BlockContextProvider({ children }) {
    const [searchBlockNumber, setSearchBlockNumber] = useState(0);
    const [dataFrom, setDataFrom] = useState('EtherScan');
    const [blockData, setBlockData] = useState({});

    const [loading, setLoading] = useState(true);

    const getBlockData = async (e = null) => {
        if (e != null) e.preventDefault();

        setLoading(true);

        setDataFrom('EtherScan');
        const hexBlockTag = Utils.hexlify(parseInt(searchBlockNumber));
        let data = await EtherScan.getBlockData(hexBlockTag);

        if (data == null) {
            setDataFrom('Alchemy');
            data = await alchemy.core.getBlock(hexBlockTag);
        }
        setBlockData(data);
        setLoading(false);
    };

    useEffect(() => {
        getBlockData();
    }, []);

    const values = {
        blockData,
        dataFrom,
        getBlockData,
        searchBlockNumber,
        setSearchBlockNumber,
        loading,
    };

    return (
        <BlockContext.Provider value={values}>{children}</BlockContext.Provider>
    );
}

const exports = {
    useBlockContext,
    BlockContextProvider,
};
export default exports;
