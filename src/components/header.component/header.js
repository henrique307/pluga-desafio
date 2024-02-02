import "./header.css"
import logo from '../../assets/logo_pluga.png';

export const HeaderComponent = ({setSearch}) => {

    return (
        <header className="header">
            <a target="_blank" rel="noreferrer" href="https://pluga.co/" className="logo-link"><img alt="logo" className="logo" src={logo}/></a>
            <input className="header-input" onChange={(event) => setSearch(event.target.value)}/>
        </header>
    )
}