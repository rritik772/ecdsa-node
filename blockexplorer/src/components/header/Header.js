import { IconSearch } from '@tabler/icons-react';

import BlockContext from './../../context/BlockContext';

function Header() {
    const { searchBlockNumber, setSearchBlockNumber, getBlockData } =
        BlockContext.useBlockContext();

    return (
        <div className="container mx-auto p-5 my-2 flex justify-between items-center border-2">
            <h2 className="font-bold text-4xl">Ethereum Block Explorer</h2>

            <form onSubmit={getBlockData} className="">
                <label
                    htmlFor="block_search"
                    className="flex items-center relative"
                >
                    <input
                        type="text"
                        id="block_search"
                        placeholder="Block number"
                        className="input"
                        value={searchBlockNumber}
                        onChange={e => setSearchBlockNumber(e.target.value)}
                    />
                    <button className="button absolute right-2">
                        <IconSearch size={20} className="icon" />
                    </button>
                </label>
            </form>
        </div>
    );
}

export default Header;
