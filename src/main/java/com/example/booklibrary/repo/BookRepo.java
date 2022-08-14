package com.example.booklibrary.repo;

import com.example.booklibrary.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepo extends PagingAndSortingRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);

    @Query(value = "SELECT b FROM Book b WHERE " +
            "b.title LIKE CONCAT('%',:searchText,'%')" +
            "OR b.author LIKE CONCAT('%',:searchText,'%') " +
            "OR b.genre LIKE CONCAT(:searchText,'%') " +
            "OR b.language LIKE CONCAT(:searchText,'%')")
    Page<Book> findAll(Pageable pageable, @Param("searchText") String searchText);

//    @GetMapping("/search/{searchText}")
//    Page<Book> findAll(Pageable pageable, @PathVariable String searchText);
}
