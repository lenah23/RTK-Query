import { useState } from 'react';
import {
  useAddProductMutation,
  useGetGoodsQuery,
  useDeleteProductMutation,
} from './redux/goodsApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './App.css';

function App() {
  const [count, setCount] = useState('');
  const [newProduct, setNewProduct] = useState('');

  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = () => {
    if (newProduct) {
      addProduct({ name: newProduct });
      setNewProduct('');
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  if (isLoading) return <h1>Loading ...</h1>;

  return (
    <div className='App'>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="''">All</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <ul>
        {data?.map((item) => {
          return (
            <div>
              <li>{item.name}</li>
              <div onClick={() => handleDeleteProduct(item.id)}>
                Delete the product
              </div>
            </div>
          );
        })}
      </ul>
      <input
        onChange={(e) => setNewProduct(e.target.value)}
        value={newProduct}
      ></input>
      <button onClick={handleAddProduct}>Add a new product</button>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField id='outlined-basic' label='Outlined' variant='outlined' />
      </Box>
    </div>
  );
}

export default App;
