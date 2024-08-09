package com.alby.student.repository;

import com.alby.student.model.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentRepository extends CrudRepository<Student, Long> {
    List<Student> findByActiveTrue();
    Student findByIdAndActiveTrue(Long id);
}
