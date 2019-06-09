package com.example.cinema.blImpl.sales;

import com.example.cinema.bl.sales.ExpensesService;
import com.example.cinema.data.sales.ExpensesMapper;
import com.example.cinema.po.Expenses;
import com.example.cinema.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;

public class ExpensesServiceImpl implements ExpensesService {
    @Autowired
    ExpensesMapper expensesMapper;

    @Override
    public ResponseVO insertExpenses(Expenses expenses) {
        try {
            expensesMapper.insertExpenses(expenses);
        }catch (Exception e){
            return ResponseVO.buildFailure("插入消费记录失败");
        }
        return ResponseVO.buildSuccess();
    }

    @Override
    public ResponseVO showAllExpenses(int id) {
        try {
            return ResponseVO.buildSuccess(expensesMapper.showExpensesByUserId(id));
        }catch (Exception e){
            return ResponseVO.buildFailure("查询消费记录失败");
        }

    }
}
