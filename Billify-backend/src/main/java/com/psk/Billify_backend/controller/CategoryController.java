package com.psk.Billify_backend.controller;

import com.psk.Billify_backend.io.CategoryRequest;
import com.psk.Billify_backend.io.CategoryResponse;
import com.psk.Billify_backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")  // Base URL
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestBody CategoryRequest request){
        return categoryService.add(request);
    }
}
