import { Box, Card } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
/* import ReactToPrint from 'react-to-print'; */
// import PrintFooter from '../../Partials/PrintSection/PrintFooter';
// import PrintHeader from '../../Partials/PrintSection/PrintHeader';

import '../../assets/css/table.css';
import HtmlTable from './Htmltable';
import MuiTable from './MuiTable';
import TableHeader from './TableHeader'

export default function Table(
    {
        // db_name="",
        data=[], 
        columns=[], 
        // extraDiv=false, 
        handleAdd, 
        // deleteItem, 
        title="No title",
        // view = false

    }) {
  
    const [list, setList] = useState([]);
    const [reservelist, setReserveList] = useState([])

    useEffect(() => {
      setList(data)
      setReserveList(data)
    }, [])
    




    const handleSearch = (event) => {
        const searchText = event.target.value;

        if(searchText !== ""){
            const filteredList = reservelist.filter(d => {
                return Object.values(d).join().toLowerCase().includes(searchText.toLowerCase());
            })
            setList(filteredList)
        }else{
            setList(reservelist)
        }
    }



    return (
        <Card sx={{ margin: 2, backgroundColor: 'white' }}>
            <TableHeader handleSearch={handleSearch} title={title} handleAdd={handleAdd}/>
            <MuiTable columns={columns} data={list}/>
            {/* <HtmlTable columns={columns} data={data}/> */}
        </Card>
    )
}