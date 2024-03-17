package com.marra.mortgageapi.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.marra.mortgageapi.model.Mortgage;

@Repository
public interface MortgageRepository extends JpaRepository<Mortgage, Integer> {
    @Query("SELECT COUNT(id) FROM Mortgage")
	int getNoOfCustomers();
}
