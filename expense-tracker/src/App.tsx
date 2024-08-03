import { useState } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList/ExpenseList';
import Expense from './types/Expense';
import Form from './components/Form/Form';
import { Divider } from '@mui/material';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const categories = [
    'All Categories',
    'Food',
    'Transportation',
    'Housing',
    'Utilities',
    'Insurance',
    'Medical',
    'Savings',
    'Debt',
    'Entertainment',
    'Miscellaneous',
  ];

  return (
    <>
      <h1>Expense Tracker</h1>
      <Form expenses={expenses} setExpenses={setExpenses} />
      <Divider />
      <ExpenseList
        expenses={expenses}
        setExpenses={setExpenses}
        categories={categories}
      />
    </>
  );
}

export default App;
