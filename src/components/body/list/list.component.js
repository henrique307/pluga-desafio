import { PaginationComponent } from "./pagination/pagination.component";
import { lightenColor } from "../../../utils";
import "./list.css";
import { NotFoundComponent } from "./notFound/notfound.component";
import { useAppContext } from "../../../context/search.context";

export function ListComponent({ content, abrirModal, itensPerPage }) {
  const { currentPage, setCurrentPage } = useAppContext();

  const lastIemIndex = currentPage * itensPerPage;
  const firstItemIndex = lastIemIndex - itensPerPage;

  const itemsInPage = content.slice(firstItemIndex, lastIemIndex);

  if (content.length === 0) return <NotFoundComponent />;

  return (
    <div className="content-container">
      <ul className="card-container">
        {itemsInPage.map((item, i) => {
          return (
            <li
              className="card"
              key={i}
              style={{ backgroundColor: item.color }}
            >
              <img alt={`${item.name} logo`} className="icon" src={item.icon} />
              <span
                onClick={() => abrirModal(item)}
                className="icon-name"
                style={{ backgroundColor: lightenColor(item.color, 30) }}
              >
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>

      <PaginationComponent
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        content={content}
        itensPerPage={itensPerPage}
      />
    </div>
  );
}
