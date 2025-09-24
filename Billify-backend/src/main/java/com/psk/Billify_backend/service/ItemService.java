package com.psk.Billify_backend.service;

import com.psk.Billify_backend.io.ItemRequest;
import com.psk.Billify_backend.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);
}
