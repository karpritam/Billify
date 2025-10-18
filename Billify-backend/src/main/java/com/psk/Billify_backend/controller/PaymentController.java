package com.psk.Billify_backend.controller;

import com.psk.Billify_backend.io.OrderResponse;
import com.psk.Billify_backend.io.PaymentRequest;
import com.psk.Billify_backend.io.PaymentVerificationRequest;
import com.psk.Billify_backend.io.RazorpayOrderResponse;
import com.psk.Billify_backend.service.OrderService;
import com.psk.Billify_backend.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(),request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
