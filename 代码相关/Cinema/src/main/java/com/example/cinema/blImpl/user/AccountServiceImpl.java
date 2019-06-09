package com.example.cinema.blImpl.user;

import com.example.cinema.bl.user.AccountService;
import com.example.cinema.data.user.AccountMapper;
import com.example.cinema.po.User;
import com.example.cinema.vo.UserForm;
import com.example.cinema.vo.ResponseVO;
import com.example.cinema.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
public class AccountServiceImpl implements AccountService {
    private final static String ACCOUNT_EXIST = "账号已存在";
    @Autowired
    private AccountMapper accountMapper;

    @Override
    public ResponseVO registerAccount(UserForm userForm) {
        try {
            accountMapper.createNewAccount(userForm.getUsername(), userForm.getPassword());
        } catch (Exception e) {
            return ResponseVO.buildFailure(ACCOUNT_EXIST);
        }
        return ResponseVO.buildSuccess();
    }

    @Override
    public UserVO login(UserForm userForm) {
        User user = accountMapper.getAccountByName(userForm.getUsername());
        if (null == user || !user.getPassword().equals(userForm.getPassword())) {
            return null;
        }
        return new UserVO(user);
    }

    @Override
    public ResponseVO manageAccount(UserVO userVO){
        try {
            accountMapper.manageAccount(userVO.getId());
        } catch (Exception e){
            return ResponseVO.buildFailure("非法的删除操作");
        }
        return ResponseVO.buildSuccess();
    }

    @Override
    public ResponseVO showAllAccounts(){
        try {
            List<User> UserList = accountMapper.getAllAccount();
            return ResponseVO.buildSuccess(UserList);
        } catch (Exception e){
            return ResponseVO.buildFailure("操作非法");
        }
    }


    @Override
    public ResponseVO changeRole(int userId, String role){
        try {
            accountMapper.manageAccountRole(userId,role);
        } catch (Exception e){
            return ResponseVO.buildFailure("改变用户角色失败");
        }
        return ResponseVO.buildSuccess();
    }

}
