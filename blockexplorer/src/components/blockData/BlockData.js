import { IconLoader } from '@tabler/icons-react';
import BlockContext from './../../context/BlockContext';
import AlchemyBlockData from './AlchemyBlockData';
import EtherScanBlockData from './EtherScanBlockData';

function BlockData() {
    const { loading, blockData, dataFrom } = BlockContext.useBlockContext();

    if (loading)
        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <IconLoader size={45} className="animate-spin" />
                <span>Asking for {dataFrom}'s help</span>
            </div>
        );

    return (
        <div className="container mx-auto mt-5">
            {dataFrom === 'EtherScan' ? (
                <EtherScanBlockData data={blockData} />
            ) : (
                <AlchemyBlockData data={blockData} />
            )}
        </div>
    );
}

export default BlockData;
