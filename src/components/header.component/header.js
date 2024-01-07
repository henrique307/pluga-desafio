import "./header.css"
import logo from '../../assets/logo_pluga.png';

export const HeaderComponent = ({setPesquisa}) => {

    function pesquisaHandle(event) {
        setPesquisa(event.target.value)
    }

    return (
        <header className="header">
            <img alt="logo" className="logo" src={logo}/>
            <input className="header-input" onChange={pesquisaHandle}/>
        </header>
    )
}