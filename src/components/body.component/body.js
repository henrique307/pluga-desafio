import { useEffect, useState } from "react";
import { getData } from "../../utils/getData.js";
import Modal from "react-modal";
import { removeDobleItens } from "../../utils/filtrarObj.js";
import Cookies from 'js-cookie';
import "./body.css";
import { LoadingComponent } from "./loading.SubComponent/loading.js";
import { ListComponent } from "./list.SubComponent/list.js";

Modal.setAppElement("#root");

export const BodyComponent = ({ search }) => {
    const [data, setData] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [history, setHistory] = useState([]);

    const itensPerPage = 12
    const expirationCookieDate = 7 // dias

    useEffect(() => {
        const cookieValue = Cookies.get("itens");

        if (cookieValue) {
            setHistory(cookieValue === "undefined" ? undefined : JSON.parse(cookieValue));
        }

        (async () => {
            try {
                setData(await getData())
            } catch (e) {
                setData(undefined)
            }
        })()
    }, []);

    function handleCookies(history) {
        Cookies.set("itens", JSON.stringify(history.slice(0, 3)), { expires: expirationCookieDate });
    }

    function contentHandler(content, i) {

        if(!content) return <LoadingComponent/>;

        content = content
            .filter(item => new RegExp(search, 'i').test(item.name))
            // .filter(item => item.name.toUpperCase().includes(search.toUpperCase()))

        return <ListComponent content={content} abrirModal={abrirModal} itensPerPage={itensPerPage} />

    }

    function abrirModal(item) {

        setHistory((historyAntigo) => {
            const newHistory = [item, ...historyAntigo];
            const uniqueHistory = removeDobleItens(newHistory);
            return uniqueHistory
        });

        setModalContent(item)
        setOpen(true)
    }

    return (
        <div className="body">
            {contentHandler(data)}
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0 ,0, 0.8)'
                    },
                    content: {
                        margin: "0 auto",
                        width: "60%",
                        background: 'rgb(255, 255, 255)',
                        borderRadius: '20px',
                        padding: '20px'
                    }
                }}

            >
                <button className="close" onClick={() => setOpen(false)}>x</button>
                <div className="modal-body">
                    <img alt={modalContent?.name} className="modal-icon" src={modalContent?.icon} style={{backgroundColor: modalContent?.color}}/>
                    <section className="item-info">
                        <h1>{modalContent?.name}</h1>
                        <a target="_blank" rel="noreferrer" href={modalContent?.link} className="acessar-button">acessar</a>
                    </section>
                </div>
                <div className="modal-footer">
                    <h3 className="modal-footer-header">Ultimas ferramentas visualizadas</h3>
                    <section className="modal-history">
                        {
                            history.slice(1, 4).map((item, index) => {
                                return (
                                    <div key={index} className="modal-history-item">
                                        <img alt={item.name} className="modal-history-icone" src={item.icon} style={{backgroundColor: item.color}}/>
                                        <span className="modal-history-nome">{item.name}</span>
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