package com.psk.Billify_backend.service;

import com.psk.Billify_backend.io.CategoryRequest;
import com.psk.Billify_backend.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file) throws IOException;

    List<CategoryResponse> read();

    void delete(String categoryId);
}
