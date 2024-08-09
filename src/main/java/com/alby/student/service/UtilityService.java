package com.alby.student.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UtilityService {
    <S, T> List<T> mapList(List<S> source, Class<T> targetClass);
    <S, T> T map(S s, Class<T> targetClass);
    <S, T> void updateMap(S s, T t);
    Boolean uploadFile(String location, MultipartFile multipartFile);
    String getDynamicUniqueLocation(String domainName);
}
