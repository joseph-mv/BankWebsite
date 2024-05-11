import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below


const Example = (props) => {
    
   const data=props.transactions

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Transaction ID',
        size: 150,
      },
      {
        accessorKey: 'date',
        header: 'Date',
        size: 150,
      },
      {
        accessorKey: 'time', //normal accessorKey
        header: 'Time',
        size: 200,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 150,
      },
      
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data
     //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
