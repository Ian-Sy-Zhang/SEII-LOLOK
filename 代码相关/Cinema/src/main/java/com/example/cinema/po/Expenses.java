package com.example.cinema.po;

import java.sql.Timestamp;
import java.util.Date;

public class Expenses {
    private int expensesId;

    private int userId;

    private int Amount;

    private String Description;

    private Timestamp Date;


    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public int getAmount() {
        return Amount;
    }

    public void setAmount(int amount) {
        Amount = amount;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getExpensesId() {
        return expensesId;
    }

    public void setExpensesId(int expensesId) {
        this.expensesId = expensesId;
    }


}
