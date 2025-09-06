package com.psk.Billify_backend.service;

import com.psk.Billify_backend.io.CategoryRequest;
import com.psk.Billify_backend.io.CategoryResponse;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request);
}
