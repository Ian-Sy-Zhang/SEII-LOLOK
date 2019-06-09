package com.example.cinema.bl.user;

import com.example.cinema.po.User;
import com.example.cinema.vo.UserForm;
import com.example.cinema.vo.ResponseVO;
import com.example.cinema.vo.UserVO;

/**
 * @author huwen
 * @date 2019/3/23
 */
public interface AccountService {

    /**
     * 注册账号
     * @return
     */
    public ResponseVO registerAccount(UserForm userForm);

    /**
     * 用户登录，登录成功会将用户信息保存再session中
     * @return
     */
    public UserVO login(UserForm userForm);

    /**
     * 根据前端传来的用户ID信息删除用户
     */
    public ResponseVO manageAccount(int id);


    /**
     * 返回所有的用户,结果格式为List<User>
     */
    public ResponseVO showAllAccounts();

    /**
     * 改变User的role
     */
    public ResponseVO changeRole(User user);


    /**
     * 增加新的员工角色
     */
    public ResponseVO addAccountsByBoss(User user);

}
