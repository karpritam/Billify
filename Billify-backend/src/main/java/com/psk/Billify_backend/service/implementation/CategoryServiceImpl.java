package com.psk.Billify_backend.service.implementation;

import com.psk.Billify_backend.entity.CategoryEntity;
import com.psk.Billify_backend.io.CategoryRequest;
import com.psk.Billify_backend.io.CategoryResponse;
import com.psk.Billify_backend.repository.CategoryRepository;
import com.psk.Billify_backend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse add(CategoryRequest request) {
        CategoryEntity newCategory=convertToEntity(request);
        newCategory=categoryRepository.save(newCategory);
        return convertToResonse(newCategory);
    }

    private CategoryResponse convertToResonse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description((request.getDescription()))
                .bgColor(request.getBgColor())
                .build();
    }
}
