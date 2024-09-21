import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

const InvoiceTable = () => {
  const [items, setItems] = useState([
    { id: 1, description: 'Brochure Design', qty: 2, rate: 100, sgst: 6, cgst: 6, cess: 0, amount: 200 },
  ]);
  const [taxes, setTaxes] = useState({ sgstRate: 6, cgstRate: 6 });

 
  const handleAddItem = () => {
    setItems([
      ...items,
      { id: items.length + 1, description: '', qty: 1, rate: 0, sgst: 0, cgst: 0, cess: 0, amount: 0 },
    ]);
  };

  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

  
    updatedItems[index].amount = updatedItems[index].qty * updatedItems[index].rate;
    updatedItems[index].sgst = (updatedItems[index].amount * taxes.sgstRate) / 100;
    updatedItems[index].cgst = (updatedItems[index].amount * taxes.cgstRate) / 100;

    setItems(updatedItems);
  };

 
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const totalSGST = items.reduce((sum, item) => sum + item.sgst, 0);
  const totalCGST = items.reduce((sum, item) => sum + item.cgst, 0);
  const totalAmount = subtotal + totalSGST + totalCGST;

  return (
    <Box sx={{ padding: '20px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'black' }}>
              <TableCell sx={{ color: 'white' }}>Item Description</TableCell>
              <TableCell sx={{ color: 'white' }}>Qty</TableCell>
              <TableCell sx={{ color: 'white' }}>Rate</TableCell>
              <TableCell sx={{ color: 'white' }}>SGST</TableCell>
              <TableCell sx={{ color: 'white' }}>CGST</TableCell>
              <TableCell sx={{ color: 'white' }}>Cess</TableCell>
              <TableCell sx={{ color: 'white' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    fullWidth InputProps={{ sx: { height: '30px' } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.qty}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    fullWidth InputProps={{ sx: { height: '30px' } }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.rate}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    fullWidth InputProps={{ sx: { height: '30px' } }}
                  />
                </TableCell>
                <TableCell> <TextField
                    size="small"
                    value={item.sgst.toFixed(2)}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'sgst', e.target.value)}
                    InputProps={{ sx: { height: '30px' } }}
                  /></TableCell>
                <TableCell>{item.cgst.toFixed(2)}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.cess}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'cess', e.target.value)}
                    fullWidth InputProps={{ sx: { height: '30px' } }}
                  />
                </TableCell>
                <TableCell>{item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    
      <Button onClick={handleAddItem} sx={{ marginTop: '10px',marginRight:'44rem' }} variant="contained">
        Add Line Item
      </Button>

     
      <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
        <Box sx={{display:'flex',ml: '30rem'}}>
        <Typography>Sub Total</Typography><Typography sx={{ml:"15rem"}}> ₹{subtotal.toFixed(2)}</Typography>
        </Box>
 
<Box sx={{display:'flex',ml: '30rem'}}>
  <Typography>
    SGST ({taxes.sgstRate}%) </Typography>
    <Typography sx={{ml:"15rem"}}>₹{totalSGST.toFixed(2)}</Typography>
    </Box>
<Box sx={{display:'flex',ml: '30rem'}}>
  <Typography >
    CGST ({taxes.cgstRate}%)
  </Typography>
  <Typography sx={{ml:"15rem"}}>₹{totalCGST.toFixed(2)}</Typography>
  </Box>
<Box sx={{display:'flex'}}>
<TextField label="total" size='small'sx={{ml: '30rem'}} InputProps={{ sx: { height: '30px', fontWeight:"bold" } }}/>
<Typography variant="h6" sx={{ fontWeight: 'bold',ml:'5rem' }}>
  ₹{totalAmount.toFixed(2)}
  </Typography>
</Box>
 
</Box>


    </Box>
  );
};

export default InvoiceTable;
