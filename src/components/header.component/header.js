import "./header.css"
import logo from '../../assets/logo_pluga.png';

export const HeaderComponent = ({setPesquisa}) => {

    function pesquisaHandle(event) {
        setPesquisa(event.target.value)
    }

    return (
        <header className="header">
            <a target="_blank" rel="noreferrer" href="https://pluga.co/" className="logo-link"><img alt="logo" className="logo" src={logo}/></a>
            <input className="header-input" onChange={pesquisaHandle}/>
        </header>
    )
}