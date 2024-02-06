import { useAppContext } from "../../../../context/search.context";
import "./pagination.css"

export function PaginationComponent({
  content,
  itensPerPage,
}) {
  const {currentPage, setCurrentPage} = useAppContext();

  const pageQuantity = Math.ceil(content.length / itensPerPage);
  
  return (
    <ul className="page-icon-container">
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
  );
}
