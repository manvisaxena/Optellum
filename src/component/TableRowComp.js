import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

function TableRowComp(params) {
    const classes = useStyles();
    let {data, tag} = params
    
    return(
      <Fragment key={tag}>
        { data && (!data.Value || (data.Value && typeof(data.Value[0]) == 'string') )&&
          <TableRow>
              <TableCell padding="checkbox" />
              <TableCell >
              {tag}
              </TableCell>
              <TableCell align="right">{data.vr}</TableCell>
              <TableCell align="right">
              {
                  renderData(data)
              }
              
              </TableCell>            
          </TableRow>
        }
        {
          data && data.Value && typeof(data.Value[0]) !== 'string' && 
          <ExpandableTableRow
            key={data.vr}
            expandComponent={<Fragment>
              <TableCell>hello table row 1</TableCell>
              <TableCell align="right">hello table row 2</TableCell>
              <TableCell align="right">hello table row 3</TableCell>
            </Fragment>}
          >
            <TableCell component="th" scope="row">
              {tag}
            </TableCell>
            <TableCell align="right">{data.vr}</TableCell>
            <TableCell>
              Child----            
            </TableCell>
              

          </ExpandableTableRow>
        }
        

      </Fragment>
        
    );
}

const renderData = (data) => {

  return ((data.Value)? data.Value[0]: '')
}


const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
  
    return (
      <>
        <TableRow {...otherProps}>
          <TableCell padding="checkbox">
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {children}
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell padding="checkbox" />
            {expandComponent}
          </TableRow>
        )}
      </>
    );
  };

export default TableRowComp;