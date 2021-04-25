import React, { useState } from 'react';
import TableRowComp from '../../component/TableRowComp/TableRowComp';
import tableData from './../../report08.json';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 650
    }
});

function TableView(params) {
    const classes = useStyles();    
    return (
        <div className="App">
        
        {
            tableData && <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
            <TableBody>
            {
                Object.keys(tableData).map((item, i)=> {
                    return <TableRowComp data={tableData[item]} tag={item} key={i}></TableRowComp>
                })
            }
            
            </TableBody>
            </Table>
            </Paper>
        }
        </div>
        );
    }
    
    
    export default TableView;