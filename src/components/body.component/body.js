import { useEffect, useState } from "react";
import { getData } from "../../utils/getData.js";
import Modal from "react-modal";
import { removerDuplicatas } from "../../utils/filtrarObj.js";
import loadingSVG from "../../assets/gears-spinner.svg"
import "./body.css";

Modal.setAppElement("#root");

export const BodyComponent = ({ pesquisa }) => {
    const [dados, setDados] = useState([]);
    const [open, setOpen] = useState(false);
    const [conteudoModal, setConteudoModal] = useState(null);
    const [historico, setHistorico] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [qtdPaginas, setQtdPaginas] = useState(null);

    useEffect(() => {

        (async () => {
            try {
                setDados(await getData())
            } catch (e) {
                setDados(undefined)
            }
        })()

    }, []);

    useEffect(() => {
        setPaginaAtual(1);
        let filtro = dados.filter(dado => new RegExp(pesquisa, "i").test(dado.name))
        setQtdPaginas(Math.ceil(filtro.length / 12));
    }, [pesquisa, dados])


    function handlePageChange(event) {
        setPaginaAtual(+event.target.className.split(" ")[1])
    }

    function conteudoHandler(conteudo, i) {
        const qtdItensPorPagina = 12;
        const indexUltimoItem = paginaAtual * qtdItensPorPagina;
        const indexPrimeiroItem = indexUltimoItem - qtdItensPorPagina;

        conteudo = conteudo
            .filter(item => new RegExp(pesquisa, "i").test(item.name))
            .slice(indexPrimeiroItem, indexUltimoItem)

        return !conteudo ? <div>Estranho... ocorreu um erro buscando os dados necessários, por favor entre em contato com nosso time de desenvolvimento ~link de contato~</div> :
            conteudo.length === 0 ? <div className="loading-container"><img className="loading-svg" src={loadingSVG} alt="carregando..." /></div> :
                (
                    <div className="content-container">
                        <ul className="card-container">
                            {
                                conteudo.map((item, i) => {
                                    return (
                                        <li className="card" key={i}>
                                            <img alt={`${item.name} logo`} className="icone" src={item.icon} />
                                            <span onClick={(() => abrirModal(item))} className="icone-nome">{item.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        <ul className="pagina-icon-container">
                            {
                                Array.from({ length: qtdPaginas }, (_, i) => {
                                    return <li key={i} onClick={handlePageChange} className={`pagina-icon ${i + 1}`}>&#x2B24;</li>
                                })
                            }
                        </ul>
                    </div>
                )

    }

    function fecharModal() {
        setOpen(false)
    }

    function abrirModal(item) {

        setHistorico((historicoAntigo) => {
            const novoHistorico = [item, ...historicoAntigo];
            // Remover duplicatas mantendo apenas itens únicos
            const historicoSemDuplicatas = removerDuplicatas(novoHistorico);
            return historicoSemDuplicatas
        });

        setConteudoModal(item)
        setOpen(true)
    }

    return (
        <div className="corpo">
            {conteudoHandler(dados)}
            <Modal
                isOpen={open}
                onRequestClose={fecharModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                    },
                    content: {
                        margin: "0 auto",
                        width: "60%",
                        border: '1px solid green',
                        background: 'rgb(255, 255, 255)',
                        borderRadius: '20px',
                        padding: '20px'
                    }
                }}

            >
                <button className="fechar" onClick={fecharModal}>x</button>
                <div className="modal-body">
                    <img alt={conteudoModal?.name} className="modal-icon" src={conteudoModal?.icon} />
                    <section className="item-info">
                        <h1>{conteudoModal?.name}</h1>
                        <a target="_blank" rel="noreferrer" href={conteudoModal?.link} className="acessar-button">acessar</a>
                    </section>
                </div>
                <div className="modal-footer">
                    <h3 className="modal-footer-header">Ultimas ferramentas visualizadas</h3>
                    <section className="modal-historico">
                        {
                            historico.slice(1, 4).map((item, index) => {
                                return (
                                    <div key={index} className="modal-historico-item">
                                        <img alt={item.name} className="modal-historico-icone" src={item.icon} />
                                        <span className="modal-historico-nome">{item.name}</span>
                                        <a target="_blank" rel="noreferrer" href={item.link} className="acessar-button">acessar</a>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
            </Modal>
        </div>
    )
}