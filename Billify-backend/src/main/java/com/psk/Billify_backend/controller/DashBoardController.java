package com.psk.Billify_backend.controller;

import com.psk.Billify_backend.io.DashBoardResponse;
import com.psk.Billify_backend.io.OrderResponse;
import com.psk.Billify_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final OrderService orderService;

    @GetMapping
    public DashBoardResponse getDashboardData(){
        LocalDate today=LocalDate.now();
        Double todaySales=orderService.sumSalesByDate(today);
        Long todayOrderCount=orderService.countByOrderDate(today);
        List<OrderResponse> recentOrders=orderService.findByRecentOrders();
        return new DashBoardResponse(
                todaySales!=null?todaySales:0.0,
                todayOrderCount!=null?todayOrderCount:0,
                recentOrders
        );
    }
}
