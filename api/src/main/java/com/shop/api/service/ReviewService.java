package com.shop.api.service;

import com.shop.api.dto.ReviewDTO;
import com.shop.api.entity.Review;
import com.shop.api.repository.ReviewRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductService productService;
    private final UserService userService;

    public Review create(ReviewDTO dto){
        Review review = Review.builder()
                .text(dto.getText())
                .grade(dto.getGrade())
                .product(productService.readById(dto.getProductId()))
                .user(userService.readById(dto.getUserId()))
                .build();
        return reviewRepository.save(review);
    }

    public List<Review> readByProductId(Long id){
        return reviewRepository.findByProductId(id);
    }

    public Review update(Review review){
        return reviewRepository.save(review);
    }

    public void delete(Long id){
        reviewRepository.deleteById(id);
    }
}
