package com.example.cinema.data.user;

import com.example.cinema.po.User;
import com.example.cinema.vo.ResponseVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author huwen
 * @date 2019/3/23
 */
@Mapper
public interface AccountMapper {

    /**
     * 创建一个新的账号
     * @param username
     * @param password
     * @return
     */
    int createNewAccount(@Param("username") String username, @Param("password") String password);

    /**
     * 根据用户名查找账号
     * @param username
     * @return
     */
    User getAccountByName(@Param("username") String username);

    /**
     * 管理账号（你号没了）
     * @param userId
     * @return
     */
    int manageAccount(@Param("userId") int userId);

    List<User> getAllAccount();

    /**
     * 将特定ID的学生的role转换为指定的role
     */
    int manageAccountRole(User user);

    //增加角色
    int addAccountsByBoss(User user);

    //根据id获取角色信息
    User getAccountById(@Param("id") int id);

}
