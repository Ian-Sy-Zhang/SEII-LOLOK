package com.example.cinema.test;

import com.example.cinema.CinemaApplication;
import com.example.cinema.bl.promotion.VIPService;
import com.example.cinema.data.promotion.VIPCardTypeMapper;
import com.example.cinema.po.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = CinemaApplication.class)
public class VIPServiceTest {

    @Autowired
    VIPService vipService;
    @Autowired
    VIPCardTypeMapper vipCardTypeMapper;

    @Test
    public void testDatabase(){
        VIPCardType vipCardType = new VIPCardType();
        vipCardType.setDescription("7折会员卡无满减");
        vipCardType.setDiscountAmount(0);
        vipCardType.setDiscountRate(0.7);
        vipCardType.setTargetAmount(0);
        vipCardType.setState(1);
        vipCardTypeMapper.insertVIPCardType(vipCardType);
        System.out.println(vipCardType);
    }

    @Test
    public void test1(){
        VIPCardType vipCardType = (VIPCardType) vipService.getVIPCardTypeById(3).getContent();
        System.out.println(vipCardType.toString());
    }

    @Test
    public void test2(){
        vipService.deleteVIPCardType(1);
    }

    @Test
    public void test3(){
        VIPCardType vipCardType = new VIPCardType();
        vipCardType.setDescription("7折会员卡无满减");
        vipCardType.setDiscountAmount(0);
        vipCardType.setDiscountRate(0.7);
        vipCardType.setTargetAmount(0);
        vipCardType.setState(1);
        vipCardType = (VIPCardType) vipService.addVIPCardType(vipCardType).getContent();
        vipCardType.setState(0);
        System.out.println(vipCardType);
        vipService.updateVIPCardType(vipCardType);
    }


}
