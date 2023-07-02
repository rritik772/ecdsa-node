import {
    IconCircleChevronLeft,
    IconCircleChevronRight,
} from '@tabler/icons-react';

import BlockContext from '../../context/BlockContext';

function AlchemyBlockData({ data }) {
    const toInt = hexString => {
        return parseInt(Number(hexString), 10);
    };

    const { setSearchBlockNumber, searchBlockNumber, getBlockData } =
        BlockContext.useBlockContext();

    return (
        <div>
            <div className="grid grid-cols-2 p-5 border-2 truncate">
                <span className="flex">Block Height</span>
                <pre className="flex gap-2 items-center">
                    <IconCircleChevronLeft
                        size={20}
                        className="cursor-pointer hover:bg-black hover:text-white rounded-full"
                        onClick={() => {
                            setSearchBlockNumber(searchBlockNumber - 1);
                            getBlockData();
                        }}
                    />
                    {toInt(data.number)}
                    <IconCircleChevronRight
                        size={20}
                        className="cursor-pointer hover:bg-black hover:text-white rounded-full"
                        onClick={() => {
                            setSearchBlockNumber(searchBlockNumber + 1);
                            getBlockData();
                        }}
                    />
                </pre>

                <span>TimeStamp</span>
                <pre>{new Date(toInt(data.timestamp) * 1000).toString()}</pre>

                <span>Transactions</span>
                <pre>{data.transactions.length}</pre>

                <div className="border-b-2 my-4" />
                <div className="border-b-2 my-4" />

                <span>Mined By</span>
                <pre>{data.miner}</pre>

                <span>Difficulty</span>
                <pre>{toInt(data.difficulty, '0,0')}</pre>

                <div className="border-b-2 my-4" />
                <div className="border-b-2 my-4" />

                <span>Gas Used</span>
                <pre>{toInt(data.gasUsed, '0,0')}</pre>

                <span>Gas Limit</span>
                <pre>{toInt(data.gasLimit, '0,0')}</pre>

                <span>Extra Data</span>
                <pre>{data.extraData}</pre>
            </div>

            <div className="mt-3 grid grid-cols-2 p-5 border-2 truncate">
                <span className="flex">Hash</span>
                <pre>{toInt(data.number)}</pre>

                <span className="flex">Parent Hash</span>
                <pre>{data.parentHash}</pre>

                <span className="flex">Nonce</span>
                <pre>{data.nonce}</pre>
            </div>

            <div className="mt-2 border-2 p-5">
                <h3 className="text-xl">Transactions</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 truncate">
                    {data.transactions.map(item => (
                        <span className="mt-1">{item}</span>
                    ))}
                </div>
            </div>

            <a
                href={`https://etherscan.io/block/${toInt(data.number)}`}
                className="fixed p-3 bottom-5 right-5 border-2 border-black bg-gray-100 hover:bg-black hover:text-white"
            >
                Data by Alchemy
            </a>
        </div>
    );
}

export default AlchemyBlockData;
