package com.example.cinema.blImpl.user;


import com.example.cinema.CinemaApplication;
import com.example.cinema.bl.promotion.VIPService;
import com.example.cinema.data.promotion.VIPCardTypeMapper;
import com.example.cinema.data.sales.ExpensesMapper;
import com.example.cinema.data.user.AccountMapper;
import com.example.cinema.po.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.util.List;



@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = CinemaApplication.class)
public class AccountServiceImplTest {

    AccountServiceImpl accountService = new AccountServiceImpl();
    @Autowired
    AccountMapper accountMapper;

    @Test
    public void manageAccount() {

    }

    @Test
    public void showAllAccounts() {
        List<User> UserList = accountMapper.getAllAccount();
        for (User user:UserList){
            System.out.println(user.toString());
        }
    }

    @Test
    public void changeRole() {
    }
}