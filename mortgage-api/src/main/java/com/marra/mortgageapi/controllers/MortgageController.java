package com.marra.mortgageapi.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.marra.mortgageapi.controllers.MortgageController;
import com.marra.mortgageapi.helpers.Helper;
import com.marra.mortgageapi.model.DecimalMortgage;
import com.marra.mortgageapi.model.Mortgage;
import com.marra.mortgageapi.repos.MortgageRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MortgageController {

	@Autowired
    private MortgageRepository repository;

	Helper helper = new Helper();

	@GetMapping("/all-users")
	public List<Mortgage> getAllMortgages() {
		return repository.findAll();
	}

	DecimalMortgage convertToDecimalMortgage(Mortgage mortgage) {
		DecimalMortgage decimalMortgage = new DecimalMortgage();
		decimalMortgage.setId(mortgage.getId());
		decimalMortgage.setCustomer(mortgage.getCustomer());
		float totalLoanCent = ((float)mortgage.getTotalLoanCent()) / 100;
		decimalMortgage.setTotalLoan(((float)mortgage.getTotalLoanEuro()) + totalLoanCent);
		float interest = (mortgage.getInterest()) / 100;
		decimalMortgage.setInterest(interest);
		decimalMortgage.setYears(mortgage.getYears());
		double monthlyPayment = getMonthlyPayment(mortgage);
		decimalMortgage.setMonthlyPayment(monthlyPayment);
		return decimalMortgage;
	}
	
	@GetMapping(value = "/all-decimal-mortgages")
	public List<DecimalMortgage> getAllDecimalMortgages() {
		List<DecimalMortgage> decimalMortgagesList = new ArrayList<DecimalMortgage>();
		List<Mortgage> mortgagesList = repository.findAll();
		for(Mortgage mortgage: mortgagesList) {
			DecimalMortgage decimalMortgage = convertToDecimalMortgage(mortgage);
			decimalMortgagesList.add(decimalMortgage);
		}
		return decimalMortgagesList;
	}

	public double getMonthlyPayment(Mortgage mortgage) {
		double E = 0;    // Fixed monthly payment
		float b = 0 ;
		float interest = (mortgage.getInterest()) / 100;
		b = interest / 12;    // Interest on a monthly basis
		float U = 0 ;
		float totalLoanCent = ((float)mortgage.getTotalLoanCent()) / 100;
		float totalLoan = (float)mortgage.getTotalLoanEuro() + totalLoanCent;
		U = totalLoan;
		int p = 12 * mortgage.getYears();
		E = helper.calculateMonthlyPayment(b, U, p);
		BigDecimal bd = new BigDecimal(E).setScale(2, RoundingMode.HALF_UP);
		double convertedE = bd.doubleValue();
		return convertedE;
	}

	public class Error {
		String message;
		public Error(String message) {
			this.message = message;
		}
		public String getMessage() {
			return message;
		}
	}
	
	@RequestMapping(value = "/save-customer", method = RequestMethod.POST)
	public ResponseEntity<?> saveCustomer(@RequestBody Mortgage customerData){
		String customer = customerData.getCustomer();
		int totalLoanEuro = customerData.getTotalLoanEuro();
		int totalLoanCent = customerData.getTotalLoanCent();
		float interest = customerData.getInterest();
		int years = customerData.getYears();
		
		if(customer.length() < 2) {
			return new ResponseEntity<>(
				new Error("The name should be at least 2 characters long"),
				HttpStatus.BAD_REQUEST
			);
		}else if(!(totalLoanEuro >= 0 && totalLoanEuro <= 10000000)) {
			return new ResponseEntity<>(
				new Error("The accepted amount of value is 0-10,000,000"),
				HttpStatus.BAD_REQUEST
			);
		}else if(!(totalLoanCent >= 0 && totalLoanCent <= 99)) {
			return new ResponseEntity<>(
				new Error("The value cents should not deviate from the range of 0-99"),
				HttpStatus.BAD_REQUEST
			);
		}else if(!(interest >= 0 && interest <= 100)) {
			return new ResponseEntity<>(
				new Error("The interest must be no less than 0%, no more than 100%"),
				HttpStatus.BAD_REQUEST
			);
		}else if(!(years >= 0 && years <= 100)) {
			return new ResponseEntity<>(
				new Error("Please enter a valid number of years"),
				HttpStatus.BAD_REQUEST
			);
		}else {
			return new ResponseEntity<>(repository.save(customerData), HttpStatus.OK);
		}
	}
}
