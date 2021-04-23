import React, { useState } from 'react';
import TableRowComp from '../../component/TableRowComp';
import tableData from './../../report08.json';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


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

    console.log('tableData-: ', tableData);

    return (
        <div className="App">
            table data-:
        {
        tableData && <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                            <TableCell padding="checkbox" />
                            <TableCell>Tag</TableCell>
                            <TableCell align="right">VR</TableCell>
                            <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(tableData).map((item)=> {
                            return <TableRowComp data={tableData[item]} tag={item} key={item}></TableRowComp>
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