import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import GetTransaction from "../api/getTrasaction";
import { useEffect } from "react";
import GetAllTransaction from "../api/getAllTransaction";

function createData(name: string, date: number, status: string) {
  return { name, date, status };
}

const rows = [
  createData("Frozen yoghurt", 159, "Pending"),
  createData("Ice cream sandwich", 152, "Paid"),
  createData("Eclair", 262, "Paid"),
  createData("Cupcake", 305, "Pending"),
  createData("Gingerbread", 356, "Pending"),
];

export default function BasicTable() {
  const [data, setData] = React.useState([
    {
      _id: "",
      userId: "",
      name: "",
      email: "",
      number: "",
      contribution: {
        _id: "",
        firstName: "",
        lastName: "",
        born: "",
        died: "",
        age: "",
      },
      paymentMethod: "",
      status: "",
      amount: "",
      image: "",
      date: "",
      referenceNumber: "",
    },
  ]);
  const transactionData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await GetAllTransaction.get(token);
      if (response.status) {
        setData(response.response);
        console.log(response.response, " 2434345345345345");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    transactionData();
  }, []);
  return (
    <div className=" h-screen">
      <p className=" text-center  bg-slate-400 rounded-lg p-5">Transaction</p>
      <TableContainer component={Paper} className=" my-20">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Payer Name</TableCell>
              <TableCell>Death Names</TableCell>
              <TableCell align="right">Date Pay</TableCell>
              <TableCell align="right">Method of Payment</TableCell>
              <TableCell align="right">Amount</TableCell>

              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data Collected
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {row.contribution.firstName}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(row.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                  </TableCell>
                  <TableCell align="right">{row.paymentMethod}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    <p
                      className={
                        row.status === "paid"
                          ? "bg-green-300 text-center rounded-lg"
                          : "bg-red-300 text-center rounded-lg"
                      }
                    >
                      {row.status}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
