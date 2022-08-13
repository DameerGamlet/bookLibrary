package com.example.booklibrary.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class ResourcesController {
    @GetMapping("/genres")
    public ResponseEntity<Set<String>> getGenres() {
        return new ResponseEntity<>(Set.of(
                " Folklore",
                " Mythology",
                " Metafiction",
                " Horror",
                " Humor",
                " Textbook",
                " Mystery",
                " Classic",
                " Western",
                " Comic _ Graphic Novel",
                " Short story"
        ), HttpStatus.OK);
    }

    @GetMapping("/languages")
    public ResponseEntity<Set<String>> getLanguages() {
        return new ResponseEntity<>(Set.of(
                "Chinese",
                "English",
                "Italian",
                "Japanese",
                "Korean",
                "German",
                "Swedish",
                "Turkmen",
                "Ukrainian"
        ), HttpStatus.OK);
    }
}
