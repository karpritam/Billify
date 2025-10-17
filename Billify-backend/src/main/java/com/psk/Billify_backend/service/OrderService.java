package com.psk.Billify_backend.service;

import com.psk.Billify_backend.io.OrderRequest;
import com.psk.Billify_backend.io.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders();
}
