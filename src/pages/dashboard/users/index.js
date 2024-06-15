import MainLayout from "@/components/MainLayout";
import { useEffect, useMemo, useState } from "react";
import { fetchUsers, deleteUser } from "@/utils/api";
import { useTable, useSortBy } from "react-table";
import UserModal from "@/components/UserModal";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userData = await fetchUsers(accessToken);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadData();
  }, []);

  const handleEdit = (userId) => {
    setEditingUser(userId);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await deleteUser(userId, accessToken);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const data = useMemo(
    () =>
      users.map((user, index) => ({
        no: index + 1,
        fullName: `${user.first_name} ${user.last_name}`,
        actions: (
          <>
            <button
              onClick={() => handleEdit(user.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </>
        ),
      })),
    [users]
  );

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "no",
      },
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <MainLayout>
      <div className="mt-10 px-4 w-full relative">
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
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4"
                        key={cellIndex}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <UserModal userId={editingUser} closeModal={closeModal} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}
