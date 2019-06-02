package com.example.cinema.controller.promotion;


import com.example.cinema.bl.promotion.VIPService;
import com.example.cinema.po.VIPCardType;
import com.example.cinema.vo.ResponseVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/vip")
public class VIPCardTypeController {
    @Autowired
    VIPService vipService;

    @PostMapping("/")
    public ResponseVO addVIPCardType(@RequestBody VIPCardType vipCardType) {
        return vipService.addVIPCardType(vipCardType);
    }

    @PostMapping("/")
    public ResponseVO amendVIPCardType(@RequestBody VIPCardType vipCardType) {
        return vipService.amendVIPCardType(vipCardType);
    }

    @PostMapping("/")
    public ResponseVO getVIPCardType(@RequestParam int id) {
        return vipService.getVIPCardTypeById(id);
    }

    @PostMapping("/")
    public ResponseVO getAllVIPCardType() {
        return vipService.getAllVIPCardType();
    }

    @PostMapping("/")
    public ResponseVO deleteVIPCardType(@RequestParam int id){
        return vipService.deleteVIPCardType(id);
    }
}