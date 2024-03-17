package com.marra.mortgageapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.marra.mortgageapi.controllers.GreetingController;
import com.marra.mortgageapi.model.Mortgage;
import com.marra.mortgageapi.repos.MortgageRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class GreetingController {

	@Autowired
    private MortgageRepository repository;

    @GetMapping("/greeting")
    public ResponseEntity<String> getGreeting() {
        return ResponseEntity.ok("Hello from Spring Boot! (Deployed to main branch by GitHub Actions CI/CD pipeline)");
    }

	@GetMapping("/")
	public List<Mortgage> getAllMortgages() {
		return repository.findAll();
	}
}
