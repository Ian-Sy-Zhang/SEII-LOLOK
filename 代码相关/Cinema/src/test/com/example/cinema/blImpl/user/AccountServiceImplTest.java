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

    @Autowired
    AccountServiceImpl accountService = new AccountServiceImpl();
    @Autowired
    AccountMapper accountMapper;

    @Test
    public void manageAccount() {
        accountMapper.manageAccount(15);
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
        accountMapper.manageAccountRole(8,"manager");
    }


    @Test
    public void test111(){
        accountService.changeRole(9,"manager");
    }



    @Test
    public void addAccountsByBoss(){
        User user1 = new User();
        user1.setRole("staff");
        user1.setUsername("APPTI111");
        user1.setPassword("987654321");
        accountService.addAccountsByBoss(user1);
    }

    @Test
    public void addAccountsByBoss1(){
        User user1 = new User();
        user1.setRole("staff");
        user1.setUsername("APPTI");
        user1.setPassword("987654321");
        accountMapper.addAccountsByBoss(user1);
    }
}