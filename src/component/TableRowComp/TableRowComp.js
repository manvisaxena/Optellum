import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {DataElementDictionary} from 'dicom-data-dictionary';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  cell: {
    backgroundColor : '#c6c7c7'
  },
  row: {
    backgroundColor: 'white'
  }
});

const excludedKeys = [
  "Value",
  "vr",
  "Alphabetic"
]

function TableRowComp(params) {
  const classes = useStyles();
  let {data, tag} = params;
  
  return(
    <Fragment key={tag} >
      { data && ( !data.Value || (data.Value && typeof(data.Value[0]) == 'string') )&&
      <TableRow className= {classes.row}>
        <TableCell padding="checkbox" />
        <TableCell >
          {(tag && DataElementDictionary.prototype.lookup(tag)) ? DataElementDictionary.prototype.lookup(tag).name : tag}
        </TableCell>
        <TableCell >
          {(tag) ? tag : 'undef'}
        </TableCell>
        <TableCell align="left">{data.vr}</TableCell>
        <TableCell align="left">
          {(data.Value)? data.Value[0]: '' }              
        </TableCell>            
      </TableRow>
    }
    {
      data && data.Value && typeof(data.Value[0]) !== 'string' && 
      <TableRow className= {classes.row}>
        <TableCell padding="checkbox" />
        <TableCell >
          {(tag && DataElementDictionary.prototype.lookup(tag)) ? DataElementDictionary.prototype.lookup(tag).name : tag}
        </TableCell>
        <TableCell >
          {(tag) ? tag : 'undef'}
        </TableCell>
        <TableCell align="left">{data.vr}</TableCell>
        {
          data.Value.map((item, i) => {
            return renderChildren( item, i)})
        }
        </TableRow>
      }
    </Fragment>
    );
}
  
const renderChildren = (childrenList, ind) => {
  
  return( <TableRow key= {ind}>
    {
      (typeof(childrenList) === "string")? <td> {childrenList} </td>: Object.keys(childrenList).map((key, i) => <Fragment key={i}> 
        {
          typeof(childrenList[key]) === 'string' && <TableCell>
            { !excludedKeys.includes(key) && <Fragment>{key}</Fragment> }
            <Fragment >{ childrenList[key] }</Fragment>
          </TableCell>          
        }
        {
          Array.isArray(childrenList[key]) && <TableCell>
            { !excludedKeys.includes(key) && <Fragment>{ key}</Fragment> }
            {childrenList[key].map( (k, index) => renderChildren(k, index) )}
          </TableCell>          
        }
        {
          !Array.isArray(childrenList[key]) && typeof(childrenList[key]) === 'object' && <Fragment>
            { !excludedKeys.includes(key) && 
            <ExpandableTableRow
              expandComponent={
                <TableCell>{renderChildren(childrenList[key])}</TableCell>
              }
            >
            <TableCell> {(DataElementDictionary.prototype.lookup(key) ? DataElementDictionary.prototype.lookup(key).name : 'undefined') +' ( ' + key+ ' )'} </TableCell>
            </ExpandableTableRow>}

            { excludedKeys.includes(key) && <TableRow><Fragment>{renderChildren(childrenList[key])}</Fragment></TableRow>}
          </Fragment>
          }
        </Fragment>)

    }</TableRow>
  );
      
}
    
const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  
  return (
    <>
    <TableRow {...otherProps} style={{backgroundColor: '#abbfc5'}}>
      <TableCell padding="checkbox">
      <IconButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      </TableCell>
      {children}
    </TableRow>
    {isExpanded && (
      <TableRow style={{backgroundColor : '#e2e1e1'}}>
        <TableCell padding="checkbox" />
        {expandComponent}
      </TableRow>
    )}
    </>
    );
};
    
export default TableRowComp;