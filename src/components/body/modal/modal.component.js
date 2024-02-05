import Modal from "react-modal";
import "./modal.css"

export function ModalComponent({modalContent, history, open, setOpen}) {

  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0 ,0, 0.8)",
        },
        content: {
          margin: "0 auto",
          width: "60%",
          background: "rgb(255, 255, 255)",
          borderRadius: "20px",
          padding: "20px",
        },
      }}
    >
      <button className="close" onClick={() => setOpen(false)}>
        x
      </button>
      <div className="modal-body">
        <img
          alt={modalContent?.name}
          className="modal-icon"
          src={modalContent?.icon}
          style={{ backgroundColor: modalContent?.color }}
        />
        <section className="item-info">
          <h1>{modalContent?.name}</h1>
          <a
            target="_blank"
            rel="noreferrer"
            href={modalContent?.link}
            className="acessar-button"
          >
            acessar
          </a>
        </section>
      </div>
      <div className="modal-footer">
        <h3 className="modal-footer-head">
          Ultimas ferramentas visualizadas
        </h3>
        <section className="modal-history">
          {history.slice(1, 4).map((item, index) => {
            return (
              <div key={index} className="modal-history-item">
                <img
                  alt={item.name}
                  className="modal-history-icon"
                  src={item.icon}
                  style={{ backgroundColor: item.color }}
                />
                <span className="modal-history-nome">{item.name}</span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={item.link}
                  className="acessar-button"
                >
                  acessar
                </a>
              </div>
            );
          })}
        </section>
      </div>
    </Modal>
  );
}
