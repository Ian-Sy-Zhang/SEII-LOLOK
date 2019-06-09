package com.example.cinema.data.sales;

import com.example.cinema.po.Expenses;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ExpensesMapper {

    public int insertExpenses(Expenses expenses);

    public List<Expenses> showExpensesByUserId(int userId);
}
