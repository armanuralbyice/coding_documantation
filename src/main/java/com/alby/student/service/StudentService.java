package com.alby.student.service;

import com.alby.student.dto.Response;
import com.alby.student.dto.StudentDto;

public interface StudentService {
    Response save(StudentDto  studentDto);
    Response all();
    Response get(Long id);
    Response delete(Long id);
}
