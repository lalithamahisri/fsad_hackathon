package com.hackathon.complaintsystem.service;

import com.hackathon.complaintsystem.entity.Complaint;
import com.hackathon.complaintsystem.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository repo;

    public Complaint save(Complaint c){
        return repo.save(c);
    }

    public List<Complaint> getAll(){
        return repo.findAll();
    }

    public Complaint getById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    public void delete(Long id){
        repo.deleteById(id);
    }
}