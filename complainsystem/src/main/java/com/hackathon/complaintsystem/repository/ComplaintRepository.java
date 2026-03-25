package com.hackathon.complaintsystem.repository;

import com.hackathon.complaintsystem.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCategory(String category);

    List<Complaint> findByStatus(String status);

    List<Complaint> findByCategoryAndStatus(String category, String status);
}