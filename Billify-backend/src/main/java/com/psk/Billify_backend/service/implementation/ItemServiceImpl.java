package com.psk.Billify_backend.service.implementation;

import com.psk.Billify_backend.io.ItemRequest;
import com.psk.Billify_backend.io.ItemResponse;
import com.psk.Billify_backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {
    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) {
        return null;
    }

    @Override
    public List<ItemResponse> fetchItems() {
        return List.of();
    }

    @Override
    public void deleteItem(String itemId) {

    }
}
