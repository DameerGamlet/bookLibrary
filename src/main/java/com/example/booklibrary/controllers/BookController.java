package com.example.booklibrary.controllers;

import com.example.booklibrary.domain.Book;
import com.example.booklibrary.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/book")
@AllArgsConstructor
@CrossOrigin("*")
public class BookController {

    private final BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<Page<Book>> findAllBooks(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(bookService.getAllBooks(
                PageRequest.of(
                        pageNumber,
                        pageSize,
                        sortDir.equalsIgnoreCase("asc")
                                ? Sort.by(sortBy).ascending()
                                : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<Book>> findAllBooks(int pageNumber, int pageSize, String sortBy, String sortDir, @PathVariable("searchText") String searchText){
        return new ResponseEntity<>(bookService.getAllBooks(
                PageRequest.of(
                        pageNumber,
                        pageSize,
                        sortDir.equalsIgnoreCase("asc")
                                ? Sort.by(sortBy).ascending()
                                : Sort.by(sortBy).descending()
                ), searchText), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(bookService.getOneBook(id), HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return new ResponseEntity<>(bookService.createNewBook(book), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Book> editBook(@RequestBody Book book) {
        return new ResponseEntity<>(bookService.editBook(book), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable("id") Long id) {
        bookService.deleteBookById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
