package com.psk.Billify_backend.service;

import com.psk.Billify_backend.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;
import org.w3c.dom.ranges.RangeException;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RangeException, RazorpayException;
}
