type TableProps = {
  columns: {
    header: string;
    accessor: string;
    className?: string;
  }[];
  renderRow: (item: Record<string, unknown>) => React.ReactNode;
  data: Record<string, unknown>[];
  onHeaderClick?: (accessor: string) => void;
};

const Table = ({ columns, renderRow, data }: TableProps) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
