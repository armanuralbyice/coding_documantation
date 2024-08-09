package com.alby.student.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class StudentDto extends BaseDto{
    private String name;
    private String email;
    private String mobile;
    private String address;
}
