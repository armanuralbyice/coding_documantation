package com.alby.student.controller;

import com.alby.student.dto.Response;
import com.alby.student.dto.StudentDto;
import com.alby.student.service.StudentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/student")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    @GetMapping("/create")
    public String create (){
        return "student";
    }
    @PostMapping("/save")
    @ResponseBody
    public Response save(@ModelAttribute StudentDto studentDto){
        return studentService.save(studentDto);
    }
    @GetMapping("/all")
    @ResponseBody
    public Response all(StudentDto studentDto){
        return studentService.all();
    }
    @GetMapping("/{id}")
    @ResponseBody
    public Response get(@PathVariable Long id){
        return studentService.get(id);
    }
    @DeleteMapping("/{id}")
    @ResponseBody
    public Response delete(@PathVariable Long id){
        return studentService.delete(id);
    }
}
