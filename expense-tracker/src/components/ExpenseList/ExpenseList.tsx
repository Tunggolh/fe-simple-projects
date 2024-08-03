import Expense from '../../types/Expense';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import './ExpenseList.css';

function ExpenseTable({
  expenses,
  categories,
  setExpenses,
}: {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  categories: string[];
}) {
  const [filter, setFilter] = useState<string>('All Categories');
  const filteredExpenses =
    filter === 'All Categories'
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  return (
    <>
      <div className='expense-list'>
        <Select
          sx={{ width: '100%' }}
          value={filter}
          onChange={(e) => setFilter(e.target.value as string)}
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        {filteredExpenses.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredExpenses.map((expense: Expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>PHP{expense.amount}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          setExpenses(
                            filteredExpenses.filter((e) => e.id !== expense.id)
                          )
                        }
                        color='error'
                        variant='contained'
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>
                    PHP
                    {filteredExpenses.reduce(
                      (acc, expense) => acc + expense.amount,
                      0
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default ExpenseTable;
