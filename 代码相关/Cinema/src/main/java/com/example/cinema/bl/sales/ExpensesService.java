package com.example.cinema.bl.sales;

import com.example.cinema.po.Expenses;
import com.example.cinema.vo.ResponseVO;

import java.util.List;

public interface ExpensesService {

    public ResponseVO insertExpenses(Expenses expenses);

    public ResponseVO showAllExpenses(int id);
}
