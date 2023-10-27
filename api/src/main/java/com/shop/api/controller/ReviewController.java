package com.shop.api.controller;

import com.shop.api.dto.ReviewDTO;
import com.shop.api.entity.Review;
import com.shop.api.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<Review> create(@RequestBody ReviewDTO dto){
        return new ResponseEntity<>(reviewService.create(dto), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<Review>> readByProductId(@PathVariable Long id){
        return new ResponseEntity<>(reviewService.readByProductId(id), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Review> update(@RequestBody Review review){
        return new ResponseEntity<>(reviewService.update(review), HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public HttpStatus delete(@PathVariable Long id){
        reviewService.delete(id);
        return HttpStatus.OK;
    }
}
