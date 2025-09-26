package com.psk.Billify_backend.service.implementation;

import com.psk.Billify_backend.entity.CategoryEntity;
import com.psk.Billify_backend.io.CategoryRequest;
import com.psk.Billify_backend.io.CategoryResponse;
import com.psk.Billify_backend.repository.CategoryRepository;
import com.psk.Billify_backend.repository.ItemRepository;
import com.psk.Billify_backend.service.CategoryService;
import com.psk.Billify_backend.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;
    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        String imgUrl=fileUploadService.uploadFile(file);
        CategoryEntity newCategory=convertToEntity(request);
        newCategory.setImgUrl(imgUrl);
        newCategory=categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory=categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(()->new RuntimeException("Category not found: "+categoryId));

        // Delete image if exists
//        fileUploadService.deleteFile(existingCategory.getImgUrl());
        String imgUrl = existingCategory.getImgUrl();
        if (imgUrl != null && !imgUrl.isEmpty()) {
            fileUploadService.deleteFile(imgUrl);
        }

        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemsCount=itemRepository.countByCategoryId(newCategory.getId());
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemsCount)
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
