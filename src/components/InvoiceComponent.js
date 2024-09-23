import {  Container, Grid, Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography, 
  FormControl,
  Paper} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {useForm} from 'react-hook-form'
import html2pdf  from 'html2pdf.js';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceComponent = () => {
  
  const defaultValues = {
   


  }

   const  states = [
    { label: 'Andhra Pradesh'},
    { label:  'Assam'},
   {  label: 'Arunachal Pradesh'},
     {  label:'Bihar'},
      {  label: 'Chhattisgarh'},
      {  label:'Gujarat'},
      {  label: 'Goa'},
      {  label:   'Haryana'},
      {  label:  'Himachal Pradesh'}, 
      {  label:  'Karnataka'}, 
      {  label: 'Kerala'},
      {  label: 'Madhya Pradesh'}, 
      {  label: 'Meghalaya'},
      {  label:  'Mizoram'},
      {  label:  'Nagaland'}, 
      {  label: 'Odisha'},
      {  label: 'Punjab'}, 
      {  label: 'Rajasthan'}, 
      {  label: 'Sikkim'},
       {  label: 'Tamil Nadu'},
        {  label: 'Telangana'},
         {  label: 'Tripura'},
      {  label:  'Uttarakhand'},
       {  label: 'Uttar Pradesh'},
       {  label:  'West Bengal'}
    ]
    const [data, setData] = useState({
      yourCompany: "",
      YourCompanyName: "",
        companysGSTIN : "",
        companyAddress: "",
        City: "",
        state: "",
        india: "",
        BillTo: "",
        YourClientCompany: "",
        ClientsGSTIN: "",
     invoice :"",
     });
     const [isFocused, setIsFocused] = useState(false);
 const [selectedDate, setSelectedDate] = useState(new Date());
    const [count, setCount] = useState(0);
    const [logo, setLogo] = useState();
   
    const [taxes, setTaxes] = useState({ sgstRate: 6, cgstRate: 6 });
    const [items, setItems] = useState([
      { id: 1, description: 'Brochure Design', qty: 2, rate: 100, sgst: 6, cgst: 6, cess: 0, amount: 200 },
    ]);
    
     const onSubmit = (formData) => {
      setData(formData);
    };
    const { register, handleSubmit } = useForm({
      defaultValues: data,
    });
  
   
    console.log(setData);
    
   
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result); 
    };
    reader.readAsDataURL(file); 
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
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
    <div  >
      <Box sx={{display:'flex'}}>
    <form   onSubmit={handleSubmit()}>
      <FormControl>
      
        <Paper  elevation ={3}sx={{ height: '220vh', margin: '2%',width:'110vh', border:'1px solid skyblue'}}>
          <Grid container spacing={1}>
          <Grid item md={6}>
  <Box
    {...getRootProps()}
    sx={{
      border: '2px dashed #ccc',
      padding: '5px',
      height: '150px', 
      width: '175px',
      marginLeft: '30px',
      mt: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <input {...getInputProps()} />
    {logo ? (
      <img src={logo} alt="Uploaded Logo" style={{ width: '100%', height: '100%' }} />
    ) : (
      <Typography>Drag 'n' drop some files here, or click to select files</Typography>
    )}
  </Box>
</Grid>
            <Grid item md={6}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', padding: '2%' }}>
                TAX INVOICE
              </Typography>
            </Grid>
            <Grid item md={6} sx={{marginTop:'20px'}}>
           
          <TextField  size='small' placeholder="Your Company" value={data.yourCompany}  {...register("yourCompany")}  sx={{padding:'1px',marginRight:'45%', '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },
}}  inputprops={{ sx: { height: '30px' } }}/>  
 
          <TextField size='small' placeholder=" Your Name"  {...register("YourName")}  sx={{padding:'1px',marginRight:'45%',fontSize:'18px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}  inputprops={{ sx: { height: '18px' } }}/>
        
          <TextField size='small' placeholder="company's GSTIN" {...register("companysGSTIN")}  sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}  inputprops={{ sx: { height: '30px' } }}/>
       
          <TextField size='small' placeholder="company Address" {...register("companyAddress")} sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}} inputprops={{ sx: { height: '30px' } }} />
          <TextField size='small' placeholder="City , state" {...register("Citystate")} sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}  inputprops={{ sx: { height: '30px' } }}/>
      
          <TextField size='small' placeholder="india" {...register("india")} sx={{padding:'1px',marginRight:'45%',
            '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'black', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },
          }}  inputprops={{ sx: { height: '30px' } }}/>
            </Grid>
          </Grid>
          <Box sx={{mt:"4%"}}> 
        <Grid container > 
      <Grid  item md={6}>
        
<TextField  inputprops={{ sx: { height: '20px' } }} sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}} size='small' placeholder= 'Bill To:' {...register("BillTo")} />  
          
<TextField  inputprops={{ sx: { height: '20px' } }} sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue',
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder= 'Your Client Company' {...register("YourClientCompany")} />
       
<TextField inputprops={{ sx: { height: '30px' } }} sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}} size='small' placeholder= 'Client`s GSTIN'  {...register("ClientsGSTIN")} />
       
<TextField inputprops={{ sx: { height: '30px' } }} sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue',
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder= 'Client Address'  {...register("ClientAddress")}/>
          
<TextField inputprops={{ sx: { height: '30px' } }}  sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder= 'City,state'  {...register("Citystate")}/>
      

        
<TextField  inputprops={{ sx: { height: '30px' } }}sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}} size='small' placeholder= 'India'  {...register("India")}/>
<Box sx={{display:'flex',margin:'3px'}}>
<Typography inputprops={{ sx: { height: '30px' } }} sx={{marginLeft:'10px'}}>place of supply :</Typography>
<TextField  inputprops={{ sx: { height: '30px' } }}sx={{padding:'1px',marginRight:'%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}} size='small' placeholder= ''  {...register("SupplyAddress")}/>
</Box>
      </Grid>
      <Grid item md={4}>
      <Box sx={{display:'flex'}}>
        <TextField inputprops={{ sx: { height: '30px',width:'100px' } }} sx={{padding:'5px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue',
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}  size='small' placeholder ='Invoice#'  {...register("Invoice")}/>
        <TextField inputprops={{ sx: { height: '30px' } }} sx={{padding:'5px',marginLeft:"30px",'& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}size='small' placeholder ='INV-02' {...register("INV")}/>
        </Box>
        <Box sx={{display:'flex'}}>
       <TextField  inputprops={{ sx: { height: '30px',width:'100px' } }} sx={{padding:'5px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}size='small' placeholder ='Invoice Date' {...register("Invoice_Date")}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginTop: '10px', marginLeft: '-10px' }}>
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register('Due_Date')}
              placeholder="Due Date"
              size="small"
              sx={{
                padding: '2px',width:'50px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'blue', 
                  },
                },
                '& .Mui-focused fieldset': {
                  borderColor: 'blue', 
                },
              }}
              inputprops={{
                ...params.inputProps,
                style: { height: '30px' },
              }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
       </Box>
       <Box sx={{display:'flex'}}>
       <TextField  inputprops={{ sx: { height: '30px' ,width:'100px'} }} sx={{padding:'5px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}size='small' placeholder ='Due Date' {...register("Due_Date")}/>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginTop: '10px', marginLeft: '-10px' }}>
        <DatePicker
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register('Due_Date')}
              placeholder="Due Date"
              size="small"
              sx={{
                padding: '2px',width:'50px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'blue', 
                  },
                },
                '& .Mui-focused fieldset': {
                  borderColor: 'blue', 
                },
              }}
              inputprops={{
                ...params.inputProps,
                style: { height: '30px' },
              }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
       </Box>
      </Grid>
        </Grid>
    </Box>
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
                    fullWidth inputprops={{ sx: { height: '30px' ,'& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },} }}
                    {...register("description")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.qty}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    fullWidth inputprops={{ sx: { height: '30px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        }, } }}
                    {...register("qty")}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.rate}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    fullWidth inputprops={{ sx: { height: '30px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        }, } }}
                    {...register("rate")}
                  />
                </TableCell>
                <TableCell> <TextField
                    size="small"
                    value={item.sgst.toFixed(2)}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'sgst', e.target.value)}
                    inputprops={{ sx: { height: '30px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        }, } }}
                    {...register("sgst")}
                  /></TableCell>
                <TableCell>{item.cgst.toFixed(2)}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    value={item.cess}
                    type="number"
                    onChange={(e) => handleItemChange(index, 'cess', e.target.value)}
                    fullWidth inputprops={{ sx: { height: '30px','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        }, } }}
                    {...register("cess")}
                  />
                </TableCell>
                <TableCell>{item.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleAddItem} sx={{ marginTop: '10px',marginRight:'35rem' }} variant="contained">
        Add Line Item
      </Button>
      <Box sx={{ marginTop: '20px', textAlign: 'right' }}>
        <Box sx={{display:'flex',ml: '30rem'}}>
        <Typography>Sub Total</Typography><Typography sx={{ml:"10rem"}}> ₹{subtotal.toFixed(2)}</Typography>
        </Box>
<Box sx={{display:'flex',ml: '30rem'}}>
  <Typography>
    SGST ({taxes.sgstRate}%) </Typography>
    <Typography sx={{ml:"10rem"}}>₹{totalSGST.toFixed(2)}</Typography>
    </Box>
<Box sx={{display:'flex',ml: '30rem'}}>
  <Typography >
    CGST ({taxes.cgstRate}%)
  </Typography>
  <Typography sx={{ml:"10rem"}}>₹{totalCGST.toFixed(2)}</Typography>
  </Box>
<Box sx={{display:'flex'}}>
<TextField   inputprops={{ sx: { height: '30px' } }}sx={{padding:'5px',marginLeft:"30rem",'& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder ='total' {...register("total")}/>
<Typography variant="h6" sx={{ fontWeight: 'bold',ml:'10rem' }}>
  ₹{totalAmount.toFixed(2)}
  </Typography>
</Box>
</Box>
    </Box>
    <TextField inputprops={{ sx: { height: '30px' } }}  sx={{padding:'2px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder= 'Note'  fullWidth {...register("Note")}/>
   <TextField inputprops={{ sx: { height: '30px' } }}  sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue',
        },}}size='small' placeholder= 'It was nice working with you '  fullWidth {...register("City")}/>
    <TextField inputprops={{ sx: { height: '30px' } }}  sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder= 'Terms&conditions'  fullWidth {...register("Terms")}/>
         
         <TextField inputprops={{ sx: { height: '30px' } }}  sx={{padding:'1px',marginRight:'45%','& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'transparent', 
          },
          '&:hover fieldset': {
            borderColor: 'blue', 
          },
        },
        '& .Mui-focused fieldset': {
          borderColor: 'blue', 
        },}}size='small' placeholder= 'place make the payment by due date'  fullWidth {...register("termsdesc")}/>
          
        </Paper>
      </FormControl>
      </form  >
      </Box>
    </div>
  );
};

export default InvoiceComponent;
