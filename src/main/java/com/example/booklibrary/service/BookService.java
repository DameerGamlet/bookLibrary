package com.example.booklibrary.service;

import com.example.booklibrary.domain.Book;
import com.example.booklibrary.repo.BookRepo;
import com.github.javafaker.Faker;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepo bookRepo;

    public Page<Book> getAllBooks(Pageable pageable) {
        return bookRepo.findAll(pageable);
    }

    public Book getOneBook(Long id) {
        return bookRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found book by id: " + id));
    }

    public Book createNewBook(Book book) {
        return bookRepo.save(book);
    }

//    @Bean
//    public void test() {
//        List<Book> bookList = new ArrayList<>();
//        Faker faker = new Faker();
//        for (int i = 1; i < 1000; i++) {
//            System.out.println(faker.name().fullName() + " (" + faker.book().title() + " ) ");
//            Random rnd = new Random();
//            int n = 10000000 + rnd.nextInt(90000000);
//            List<String> countries = List.of(
//                    "Chinese", "English", "English", "English", "English", "English", "English", "English",
//                    "Italian", "Japanese", "Korean", "German", "Russian", "Russian", "Russian", "Swedish", "Turkmen",
//                    "Ukrainian"
//            );
//
//            List<String> images = List.of(
//                    "https://i.ytimg.com/vi/rrGN4uQzYyI/maxresdefault.jpg",
//                    "https://www.seoclerk.com/pics/626559-243fm01535738029.jpg",
//                    "http://spbookdesign.com/wp-content/uploads/2015/11/WriteSuccess2-Cvr.jpg",
//                    "https://pixelclerks.com/pics/550-1I9kPR1535745382.jpg",
//                    "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/12e4f682905731.5d2c59a39a01e.jpg",
//                    "https://pro2-bar-s3-cdn-cf4.myportfolio.com/ceca69afe4b35d3d37b111558a6e318e/5689cb36672745.5724e1c89315b_car_202x158.jpg?h=490d218d6b643f3209ee8243ddeb15ea",
//                    "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e60aa244710325.581b59684bb8b.jpg",
//                    "https://paulsoupiset.com/wp-content/uploads/2017/08/FOY-Mock_Front.jpg?w=640",
//                    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/e6677745595261.5835e5d2f1473.jpg"
//            );
//
//            Book book = new Book(
//                    faker.book().title() + "",
//                    faker.book().author() + "",
//                    images.get(rnd.nextInt(images.size() - 1)) + "",
//                    10000000 + rnd.nextLong(90000000),
//                    1 + rnd.nextInt(1000) + 0.99,
//                    countries.get(rnd.nextInt(countries.size() - 1)) + ""
//            );
//            System.out.println(i + ": " + book);
//            bookList.add(book);
//        }
//        bookRepo.saveAll(bookList);
//    }

    public Book editBook(Book book) {
        return bookRepo.save(book);
    }

    public void deleteBookById(Long id) {
        bookRepo.deleteById(id);
    }
}
