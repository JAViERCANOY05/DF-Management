import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

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
  return (
    <div className=" h-screen">
    
      <TableContainer component={Paper} className=" my-20">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Date Join</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
