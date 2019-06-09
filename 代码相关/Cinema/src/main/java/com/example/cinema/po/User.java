package com.example.cinema.po;

/**
 * @author huwen
 * @date 2019/3/23
 */
public class User {
    private enum role{
        USER,OPERATOR,MANAGER;
    }

    private Integer id;
    private String username;
    private String password;
    private String role;

    @Override
    public String toString() {
        return this.getId()+this.getUsername()+this.getPassword()+this.getRole();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
