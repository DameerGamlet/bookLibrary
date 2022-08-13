package com.example.booklibrary.repo;

import com.example.booklibrary.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends PagingAndSortingRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);
}
