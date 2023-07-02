import numeral from 'numeral';

function EtherScanBlockData({ data }) {
    console.log(data);

    const toInt = (hexString, format = '0') => {
        return numeral(parseInt(Number(hexString), 10)).format(format);
    };

    return (
        <div>
            <div className="grid grid-cols-2 p-5 border-2 truncate">
                <span className="flex">Block Height</span>
                <pre>{toInt(data.number)}</pre>

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

                <span>Total Difficulty</span>
                <pre>{toInt(data.totalDifficulty, '0,0')}</pre>

                <span>Size</span>
                <pre>{`${toInt(data.size, '0,0')} bytes`}</pre>

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

                <span className="flex">sha3Uncles</span>
                <pre>{data.sha3Uncles}</pre>

                <span className="flex">StateRoot</span>
                <pre>{data.stateRoot}</pre>

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
                className="absolute p-3 bottom-5 right-5 border-2 border-black bg-gray-100 hover:bg-black hover:text-white"
            >
                Data by EtherScan.io
            </a>
        </div>
    );
}

export default EtherScanBlockData;
