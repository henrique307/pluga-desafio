import { LoadingComponent } from "./loading/loading.component";
import { getData, removeDuplicates } from "../../utils";
import { ListComponent } from "./list/list.component";
import { useEffect, useState } from "react";
import { ModalComponent } from "./modal/modal.component";
import Cookies from "js-cookie";
import "./body.css";
import { ErrorComponent } from "./Error/error.component";

export const BodyComponent = ({ search }) => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(Cookies.get("itens")) || []
  );

  const itensPerPage = 12;
  const expirationCookieDate = 7; // days

  useEffect(() => {
    (async () => {
      try {
        setData(await getData());
      } catch (e) {
        setData(undefined);
      }
    })();
  }, []);

  function abrirModal(item) {
    setHistory((history) => {
      const newHistory = [item, ...history];
      const uniqueHistory = removeDuplicates(newHistory);
      return uniqueHistory;
    });

    Cookies.set("items", JSON.stringify(history.slice(0, 3)), {
      expires: expirationCookieDate,
    });

    setModalContent(item);
    setOpen(true);
  }

  return (
    <div className="body">
      {data ? (
        <ListComponent
          content={data.filter((item) =>
            item.name.toUpperCase().includes(search.toUpperCase())
          )}
          abrirModal={abrirModal}
          itensPerPage={itensPerPage}
        />
      ) : data === undefined ? (
        <ErrorComponent />
      ) : (
        <LoadingComponent />
      )}

      <ModalComponent
        history={history}
        modalContent={modalContent}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};
