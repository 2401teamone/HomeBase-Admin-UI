import TableCell from "./TableCell";
import Checkbox from "../utils/Checkbox.jsx";

import { useModalContext } from "../../hooks/useModal";

export default function TableRow({
  table,
  row,
  setRows,
  selectedRow,
  setSelectedRow,
  tableIsScrolled,
}) {
  const {
    actionCreators: { editRecord },
  } = useModalContext();

  return (
    table && (
      <tr className="tr">
        <td
          className={`select-row-header sticky-col ${
            tableIsScrolled && "shadow"
          }`}
        >
          <Checkbox
            checked={selectedRow === row.id}
            onChange={() => {
              setSelectedRow((prev) => {
                if (prev === row.id) return null;
                return row.id;
              });
            }}
          />
        </td>
        <TableCell
          table={table}
          column={{ type: "pk", name: "id" }}
          row={row}
        />
        {table.columns.map((column) => {
          return (
            <TableCell
              key={`${column.name}-${row.id}`}
              table={table}
              column={column}
              row={row}
              setRows={setRows}
            />
          );
        })}
        <TableCell
          table={table}
          column={{ type: "created_at", name: "created_at" }}
          row={row}
        />
        <TableCell
          table={table}
          column={{ type: "updated_at", name: "updated_at" }}
          row={row}
        />
        <td className="sticky-col right-arrow">{`->`}</td>
        <td onClick={() => editRecord({ table, row, setRows })}>x</td>
      </tr>
    )
  );
}
