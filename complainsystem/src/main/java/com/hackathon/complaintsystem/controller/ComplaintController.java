package com.hackathon.complaintsystem.controller;

import com.hackathon.complaintsystem.entity.Complaint;
import com.hackathon.complaintsystem.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin("*")
public class ComplaintController {

    @Autowired
    private ComplaintRepository repo;

    // CREATE
    @PostMapping
    public Complaint create(@RequestBody Complaint c) {
        c.setStatus("Pending");
        return repo.save(c);
    }

    // READ + PAGINATION
    @GetMapping
    public Page<Complaint> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return repo.findAll(PageRequest.of(page, size));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Complaint update(@PathVariable Long id, @RequestBody Complaint c) {
        Complaint existing = repo.findById(id).orElseThrow();
        existing.setStatus(c.getStatus());
        return repo.save(existing);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    // FILTER
    @GetMapping("/filter")
    public List<Complaint> filter(@RequestParam String status) {
        return repo.findAll().stream()
                .filter(c -> c.getStatus().equalsIgnoreCase(status))
                .toList();
    }

    // ANALYTICS
    @GetMapping("/stats")
    public Map<String, Long> stats() {
        Map<String, Long> map = new HashMap<>();
        map.put("Pending", repo.count());
        return map;
    }
}