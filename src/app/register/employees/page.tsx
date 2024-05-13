"use client";
import { useState, useEffect } from "react";

import "./Employees.css";
import axios from "axios";
import Aside from "@/components/Aside";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";
import Modal from "@/components/Modal/Modal";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types/employee.types";
import { TableColumn } from "@/models/TableColumn";
import DynamicTable from "@/components/DynamicTable";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const [data, setData] = useState<Employee[]>([]);
  // const [error, setError] = useState(null);
  const router = useRouter();

  const columns = [
    {
      header: "Nome",
      accessorKey: "name"
    },
    {
      header: "Cpf",
      accessorKey: "cpf"
    },
    {
      header: "Num. telefone",
      accessorKey: "phone"
    },
    {
      header: "Num. celular",
      accessorKey: "cel_number"
    },
    {
      header: "Salário",
      accessorKey: "salary"
    },
    {
      header: "Admissão",
      accessorKey: "admission"
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }: { row: Row<Employee> }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ver mais</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/register/employees/${row.original.id}`)}
              >
                Ver detalhes do funcionário
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="EDIT"
                    typeRegister="Employee"
                    nameModal="funcionario"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </AlertDialog>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                <AlertDialog>
                  <Modal
                    typeModal="DELETE"
                    typeRegister="Employee"
                    nameModal="funcionario"
                    rowData={row.original}
                    idRowData={row.original.id}
                  />
                </AlertDialog>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  const arrayFilterFieldsByAcessorKey = columns.reduce((acc: TableColumn[], column) => {
    if (column.accessorKey && column.header) {
      acc.push({ header: column.header, accessorKey: column.accessorKey });
    }
    return acc;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("api/employees");
        setData(resp.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-layout">
      <nav className="aside-layout">
        <Aside />
      </nav>
      <main className="main-layout">
        <DynamicTable
          columns={columns}
          data={data}
          filterFields={arrayFilterFieldsByAcessorKey}
          typeRegister="Employee"
        />
      </main>
    </div>
  );
}
