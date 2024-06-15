import MainLayout from "@/components/MainLayout";
import { useEffect, useMemo, useState } from "react";
import { fetchArticles } from "@/utils/api";
import { useTable, useSortBy } from "react-table";
import Link from "next/link";

export default function ArticlePages() {
  const [articles, setArticles] = useState([]);
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (accessToken && ["admin", "owner"].includes(storedRole)) {
      fetchArticles(accessToken)
        .then((data) => {
          setArticles(data.data);
          setPage(data.page);
          setTotalPage(data.totalPage);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching articles:", error);
          setLoading(false);
        });
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row }) => (
          <Link href={`/dashboard/articles/${row.original.slug}`}>
            {row.original.title}
          </Link>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => articles, [articles]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  if (loading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  if (role === "admin") {
    return (
      <MainLayout>
        <div>
          <table {...getTableProps()} className="w-full">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={colIndex}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4"
                        key={cellIndex}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Prev
            </button>
            <span className="text-gray-500">
              Page {page} of {totalPage}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Next
            </button>
          </div>
        </div>
      </MainLayout>
    );
  } else if (role === "owner") {
    return (
      <MainLayout>
        <div>
          <table {...getTableProps()} className="w-full">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, colIndex) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={colIndex}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.slice(0, 20).map((row, rowIndex) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4"
                        key={cellIndex}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Prev
              </button>
            )}
            <span className="text-gray-500">Page {page} of 2</span>
            {page < 2 && (
              <button
                onClick={() => setPage(page + 1)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </MainLayout>
    );
  }
}
