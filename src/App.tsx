import { ChessRoom } from './components'
import { DefaultLayout } from './layouts'
import { Routes, Route } from 'react-router-dom'
function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<ChessRoom />}></Route>
                {/* <Route path='/chien-thuat' element={<DefaultLayout />}></Route> */}
            </Routes>
        </>
    )
}

export default App
