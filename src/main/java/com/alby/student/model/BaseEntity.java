package com.alby.student.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false)

    @Temporal(TemporalType.TIMESTAMP)
    private Date createAt;
    @Column(updatable = false)
    private Long createBy;
    @Temporal(TemporalType.DATE)
    private Date updateAt;
    private Long updatedBy;
    private boolean active;

    @PrePersist
    public void setPreInsertData(){
        this.createAt = new Date();
        this.active = true;
    }
    @PreUpdate
    public void setPreUpdateData(){
        this.updateAt = new Date();
    }
}
