package com.example.booklibrary.service;

import com.example.booklibrary.domain.Book;
import com.example.booklibrary.repo.BookRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepo bookRepo;
    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }

    public Book getOneBook(Long id) {
        return bookRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found book by id: " + id));
    }

    public Book createNewBook(Book book) {
        return bookRepo.save(book);
    }

    public Book editBook(Book book) {
        return bookRepo.save(book);
    }

    public void deleteBookById(Long id) {
        bookRepo.deleteById(id);
    }
}
