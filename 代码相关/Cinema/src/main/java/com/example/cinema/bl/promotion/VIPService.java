package com.example.cinema.bl.promotion;

import com.example.cinema.po.VIPCardType;
import com.example.cinema.vo.VIPCardForm;
import com.example.cinema.vo.ResponseVO;



/**
 * Created by liying on 2019/4/14.
 */

public interface VIPService {

    ResponseVO addVIPCard(int userId);

    ResponseVO getCardById(int id);

    ResponseVO getVIPInfo();

    ResponseVO charge(VIPCardForm vipCardForm);

    ResponseVO getCardByUserId(int userId);

    ResponseVO addVIPCardType(VIPCardType vipCardType);

    ResponseVO updateVIPCardType(VIPCardType vipCardType);

    ResponseVO getVIPCardTypeById(int id);

    ResponseVO getAllVIPCardType();

    ResponseVO deleteVIPCardType(int id);
}
