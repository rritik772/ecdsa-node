import Header from './components/header/Header';
import CurrentStatus from './components/currentStatus/currentStatus';
import BlockData from './components/blockData/BlockData';

import BlockContext from './context/BlockContext';

function App() {
    return (
        <div className="">
            <BlockContext.BlockContextProvider>
                <Header />
                <CurrentStatus />
                <BlockData />
            </BlockContext.BlockContextProvider>

            <div className="mb-20" />
        </div>
    );
}

export default App;
