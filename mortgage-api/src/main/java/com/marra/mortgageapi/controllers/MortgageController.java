package com.marra.mortgageapi.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

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
}
