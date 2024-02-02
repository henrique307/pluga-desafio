import { useState } from "react";
import { clarearCor } from "../../../utils/modificaCor";
import "./list.css"

export function ListComponent({ content, abrirModal, itensPerPage }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexUltimoItem = currentPage * itensPerPage;
  const indexPrimeiroItem = indexUltimoItem - itensPerPage;

  const pageQuantity = Math.ceil(content.length / itensPerPage);

  content = content.slice(indexPrimeiroItem, indexUltimoItem);

  return (
    <div className="content-container">
      <ul className="card-container">
        {content.map((item, i) => {
          return (
            <li
              className="card"
              key={i}
              style={{ backgroundColor: item.color }}
            >
              <img
                alt={`${item.name} logo`}
                className="icone"
                src={item.icon}
              />
              <span
                onClick={() => abrirModal(item)}
                className="icone-nome"
                style={{ backgroundColor: clarearCor(item.color, 30) }}
              >
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>

      <ul className="pagina-icon-container">
        {Array.from({ length: pageQuantity }, (_, i) => {
          return (
            <li
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`page-icon${currentPage === i + 1 ? " active" : ""}`}
            >
              &#x2B24;
            </li>
          );
        })}
      </ul>
    </div>
  );
}
