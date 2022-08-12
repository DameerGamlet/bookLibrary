package com.example.booklibrary.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String title;
    private String author;
    @Column(length = 512)
    private String coverPhotoUrl;
    private Long isbnNumber;
    private Double price;
    private String language;

    public Book(String title, String author, String coverPhotoUrl, Long isbnNumber, Double price, String language) {
        this.title = title;
        this.author = author;
        this.coverPhotoUrl = coverPhotoUrl;
        this.isbnNumber = isbnNumber;
        this.price = price;
        this.language = language;
    }
}
