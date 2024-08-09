package com.alby.student.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity(name = "student")
@Data
public class Student extends BaseEntity{
    private String name;
    private String email;
    private String mobile;
    private String address;
}
