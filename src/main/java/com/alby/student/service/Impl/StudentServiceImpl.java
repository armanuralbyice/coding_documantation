package com.alby.student.service.Impl;

import com.alby.student.dto.Response;
import com.alby.student.dto.StudentDto;
import com.alby.student.model.Student;
import com.alby.student.repository.StudentRepository;
import com.alby.student.service.StudentService;
import com.alby.student.service.UtilityService;
import com.alby.student.utils.ResponseBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final UtilityService utilityService;

    public StudentServiceImpl(StudentRepository studentRepository, UtilityService utilityService) {
        this.studentRepository = studentRepository;
        this.utilityService = utilityService;
    }

    @Override
    public Response save(StudentDto studentDto) {
        try {
            log.info("saving student info: {}", studentDto.toString());
            Student student = utilityService.map(studentDto, Student.class);
            student.setActive(true);
            studentRepository.save(student);
            return ResponseBuilder.getSuccessResponse(HttpStatus.CREATED, null, "Student save successfully");
        }catch (Exception e){
            log.error(e.getMessage());
            return ResponseBuilder.getFailResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error");
        }
    }

    @Override
    public Response all() {
        log.info("Get student list");
        List<Student> studentList = studentRepository.findByActiveTrue();
        List<StudentDto> studentDtoList = utilityService.mapList(studentList, StudentDto.class);
        return ResponseBuilder.getSuccessResponse(HttpStatus.OK, studentDtoList, "Get Student List");
    }

    @Override
    public Response get(Long id) {
        log.info("Get student info:{}", id);
        Student student = studentRepository.findByIdAndActiveTrue(id);
        if(student!=null){
            return ResponseBuilder.getSuccessResponse(HttpStatus.OK, utilityService.map(student, StudentDto.class),"Get Student");
        }
        return ResponseBuilder.getFailResponse(HttpStatus.NOT_FOUND,"Student info not found");
    }

    @Override
    public Response delete(Long id) {
        log.info("Deleting student info:{}", id);
        Student student = studentRepository.findByIdAndActiveTrue(id);
        if(student != null){
            student.setActive(false);
            studentRepository.save(student);
            return ResponseBuilder.getSuccessResponse(HttpStatus.OK, null, "Student info delete successfully");
        }
        return ResponseBuilder.getFailResponse(HttpStatus.NOT_FOUND, "student info not found");
    }
}
