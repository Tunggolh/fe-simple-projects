import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Expense from '../../types/Expense';
import './Form.css';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z.string().min(3, { message: 'Description is too short' }),
  amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
  category: z.string().min(1, { message: 'Category is required' }),
});

type SchemaForm = z.infer<typeof schema>;

function Form({
  expenses,
  setExpenses,
}: {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchemaForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      amount: 0,
      category: '',
    },
  });

  const categories = [
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

  const onSubmit = (data: FieldValues) => {
    const expense: Expense = {
      id: expenses.length + 1,
      description: data.description,
      amount: data.amount,
      category: data.category,
    };
    setExpenses([...expenses, expense]);
    reset();
  };

  return (
    <form className='form-expense' onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        sx={{ marginBottom: '2rem' }}
        error={errors.description ? true : false}
      >
        <InputLabel htmlFor='description'>Description</InputLabel>
        <Input id='description' type='text' {...register('description')} />
        {errors.description && (
          <FormHelperText>{errors.description.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl
        sx={{ marginBottom: '2rem' }}
        error={errors.amount ? true : false}
      >
        <InputLabel htmlFor='amount'>Amount</InputLabel>
        <Input
          id='amount'
          type='number'
          {...register('amount', { valueAsNumber: true })}
        />
        {errors.amount && (
          <FormHelperText>{errors.amount.message}</FormHelperText>
        )}
      </FormControl>
      <FormControl
        fullWidth
        sx={{ marginBottom: '2rem' }}
        error={errors.category ? true : false}
      >
        <InputLabel id='category-label'>Category</InputLabel>
        <Controller
          name='category'
          control={control}
          render={({ field }) => (
            <Select
              labelId='category-label'
              id='category'
              label='Category'
              {...field}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <Button variant='contained' type='submit'>
        Add Expense
      </Button>
    </form>
  );
}

export default Form;
