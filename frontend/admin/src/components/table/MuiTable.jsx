import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge, Box, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EditIcon from '@mui/icons-material/Edit';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({columns=[], data=[]}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.length != 0 && columns.map((column, index) => (
              column.title === 'Action' ? 
              <TableCell align="right">{column.title}</TableCell>:
              <TableCell align="left">{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length != 0 && data.map((row, index) => (
            <TableRow
              key={row.name}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column, index) => {
                
                switch(column.title){
                  case 'Action':
                    return (
                    <TableCell align="right">
                      {column.handleEdit &&
                      <IconButton onClick={() => column.handleEdit(row?._id)} size='small'>
                        <EditIcon color='primary'/>
                      </IconButton>
                      }
                      {column.handleDelete &&
                        <IconButton onClick={() => column.handleDelete(row?._id)} size='small'>
                        <DeleteIcon color='error'/>
                      </IconButton>}
                    </TableCell>
                    )
                  case 'Status':
                    return (
                      <TableCell key={index} align="left">
                        {row[column.field] === 'APPROVED' &&
                          <Box sx={{color: 'success.main'}}>{row[column.field]}</Box>
                        }
                        {row[column.field] === 'PENDING' &&
                          <Box sx={{color: 'secondary.main'}}>{row[column.field]}</Box>
                        }
                        {row[column.field] === 'REJECTED' &&
                          <Box sx={{color: 'error.main'}}>{row[column.field]}</Box>
                        }
                      </TableCell>
                    )
                  default: 
                      return(
                        
                        <TableCell key={index} align="left">{row[column.field]}</TableCell>
                      )
                }
    
                 
  
              })}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
