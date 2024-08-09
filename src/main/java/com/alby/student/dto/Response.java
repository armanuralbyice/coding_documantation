package com.alby.student.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class Response {
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private int statusCode;
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private String status;
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Object content;
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Long timestamp;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long totalCount;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int numberOfElements;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<ErrorResponseDto> errors;
}
